import { env } from '@/env';
import { createRailwayService } from '@/services/railway';
import { decrypt } from '@/utils/encryption';
import { prisma } from '@conductor/database';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure } from '../../procedures';

const deployServerSchema = z.object({
  gameType: z.string(),
  serverName: z.string()
});

export const deployServer = protectedProcedure
  .input(deployServerSchema)
  .mutation(async ({ ctx, input }) => {
    const { gameType, serverName } = input;

    // Validate the game exists
    const game = await prisma.game.findUnique({
      where: { id: gameType }
    });
    if (!game) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Game not found'
      });
    }

    // Get Railway access token from config
    const railwayConfig = await prisma.railway.findUnique({
      where: { id: 'railway_config' }
    });
    if (!railwayConfig) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Railway not configured. Please complete onboarding.'
      });
    }

    // Create Railway service with user's token
    const accessToken = decrypt(railwayConfig.accessToken);
    const railway = createRailwayService(accessToken);

    // Get the template to get its serialized config
    const template = await railway.getTemplate(game.railwayTemplateCode);

    // Check if the Railway project exists
    const project = await railway.getProject(env.RAILWAY_PROJECT_ID);
    if (!project) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Railway project not found'
      });
    }

    // Get existing services before deployment to track what's new
    const servicesBefore = await railway.getProjectServices(
      env.RAILWAY_PROJECT_ID
    );
    const existingServiceIds = new Set(
      servicesBefore.project.services.edges.map(edge => edge.node.id)
    );

    // Deploy the template
    const deployment = await railway.deployTemplateV2({
      templateId: template.id,
      serializedConfig: template.serializedConfig,
      projectId: env.RAILWAY_PROJECT_ID,
      environmentId: env.RAILWAY_ENVIRONMENT_ID
    });

    // Wait for deployment to complete (poll for up to 60 seconds)
    let deploymentComplete = false;
    let attempts = 0;
    const maxAttempts = 30; // 30 * 2 seconds = 60 seconds

    while (!deploymentComplete && attempts < maxAttempts) {
      const status = await railway.getWorkflowStatus(deployment.workflowId);

      if (status.status === 'Complete') {
        deploymentComplete = true;
      } else if (status.error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Railway deployment failed: ${status.error}`
        });
      } else {
        // Wait 2 seconds before next check
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
      }
    }

    if (!deploymentComplete) {
      throw new TRPCError({
        code: 'TIMEOUT',
        message: 'Deployment timeout - please check Railway dashboard'
      });
    }

    // Get project services after deployment
    const servicesAfter = await railway.getProjectServices(
      deployment.projectId
    );

    // Find the newly created service
    const newService = servicesAfter.project.services.edges.find(edge => {
      return !existingServiceIds.has(edge.node.id);
    });

    if (!newService) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Could not find newly deployed service'
      });
    }

    const service = newService.node;

    // Poll for TCP proxy configuration (Railway takes time to provision it)
    let tcpProxy: { domain: string; proxyPort: number } | null = null;
    let proxyAttempts = 0;
    const maxProxyAttempts = 15; // 15 * 2 seconds = 30 seconds

    while (!tcpProxy && proxyAttempts < maxProxyAttempts) {
      const tcpProxies = await railway.getTcpProxies(
        env.RAILWAY_ENVIRONMENT_ID,
        service.id
      );

      if (tcpProxies && tcpProxies.length > 0) {
        tcpProxy = tcpProxies[0] || null;
      } else {
        // Wait 2 seconds before next check
        await new Promise(resolve => setTimeout(resolve, 2000));
        proxyAttempts++;
      }
    }

    if (!tcpProxy) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'TCP proxy provisioning timeout - please check Railway dashboard'
      });
    }

    // Build connection URL
    const connectionUrl = `${tcpProxy.domain}:${tcpProxy.proxyPort}`;

    // Create the game server record with all details
    const gameServer = await prisma.gameServer.create({
      data: {
        name: serverName,
        gameId: game.id,
        userId: ctx.session.userId,
        railwayServiceId: service.id,
        railwayUrl: connectionUrl,
        enabled: true
      },
      include: {
        game: true,
        connections: true
      }
    });

    // Create the connection configuration
    await prisma.gameServerConnection.create({
      data: {
        serverId: gameServer.id,
        name: 'Default',
        enabled: true,
        isDefault: true
      }
    });

    return {
      id: gameServer.id,
      name: gameServer.name,
      enabled: gameServer.enabled,
      game: game.displayName,
      connectionUrl
    };
  });
