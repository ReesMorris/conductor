import { env } from '@/env';
import { prisma } from '@conductor/database';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure } from '../../procedures';

const deployServerSchema = z.object({
  gameType: z.string(),
  serverName: z.string(),
  connectionType: z.enum(['railway', 'domain']),
  domain: z.string().optional(),
  proxyPort: z.number().int().min(1).max(65535)
});

export const deployServer = protectedProcedure
  .input(deployServerSchema)
  .mutation(async ({ ctx, input }) => {
    const { gameType, serverName, connectionType, domain, proxyPort } = input;

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

    // Check for port conflicts if using custom domain
    if (connectionType !== 'railway') {
      const existingConnection = await prisma.gameServerConnection.findFirst({
        where: {
          domain,
          proxyPort
        }
      });

      if (existingConnection) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'This domain/port combination is already in use'
        });
      }
    }

    // TODO: Deploy to Railway using Railway API
    // For now, we'll create a mock deployment
    const railwayServiceId = `railway-${Date.now()}`; // Mock Railway service ID

    // Create the game server record
    const gameServer = await prisma.gameServer.create({
      data: {
        name: serverName,
        gameId: game.id,
        userId: ctx.session.userId,
        railwayServiceId,
        railwayUrl:
          connectionType === 'railway'
            ? `${serverName}-production.up.railway.app`
            : undefined,
        enabled: true
      },
      include: {
        game: true
      }
    });

    // Create the connection configuration
    await prisma.gameServerConnection.create({
      data: {
        serverId: gameServer.id,
        domain: connectionType === 'railway' ? undefined : domain,
        proxyPort,
        name: 'Default',
        enabled: true,
        isDefault: true
      }
    });

    // TODO: Actually deploy to Railway here
    // await deployToRailway({
    //   templateId: game.railwayTemplateId,
    //   serviceName: serverName,
    //   ...
    // });

    return {
      id: gameServer.id,
      name: gameServer.name,
      enabled: gameServer.enabled,
      game: game.displayName,
      connectionUrl: getConnectionUrl(connectionType, domain, proxyPort)
    };
  });

function getConnectionUrl(
  connectionType: string,
  domain?: string,
  proxyPort?: number
): string {
  switch (connectionType) {
    case 'railway':
      return `${env.PROXY_DOMAIN}:${proxyPort}`;
    case 'domain':
      return `${domain}:${proxyPort}`;
    default:
      return '';
  }
}
