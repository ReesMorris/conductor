import { env } from '@/env';
import { createRailwayService } from '@/services/railway';
import { decrypt } from '@/utils/encryption';
import { prisma } from '@conductor/database';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure } from '../../procedures';

const getDeleteInfoSchema = z.object({
  serverId: z.string()
});

export const getDeleteInfo = protectedProcedure
  .input(getDeleteInfoSchema)
  .query(async ({ ctx, input }) => {
    const { serverId } = input;

    // Get the server and verify ownership
    const server = await prisma.gameServer.findFirst({
      where: {
        id: serverId,
        userId: ctx.session.userId
      },
      include: {
        game: true
      }
    });

    if (!server) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Server not found or you do not have permission to delete it'
      });
    }

    // Check if Railway service still exists
    let railwayServiceExists = false;
    if (server.railwayServiceId) {
      const railwayConfig = await prisma.railway.findUnique({
        where: { id: 'railway_config' }
      });

      if (railwayConfig) {
        try {
          const accessToken = decrypt(railwayConfig.accessToken);
          const railway = createRailwayService(accessToken);
          const services = await railway.getProjectServices(
            env.RAILWAY_PROJECT_ID
          );
          railwayServiceExists = services.project.services.edges.some(edge => {
            return edge.node.id === server.railwayServiceId;
          });
        } catch (error) {
          console.error('Failed to check Railway service:', error);
          // Assume it exists if we can't check
          railwayServiceExists = true;
        }
      }
    }

    // Generate Railway dashboard URL for the service
    const railwayDashboardUrl = server.railwayServiceId
      ? `https://railway.com/project/${env.RAILWAY_PROJECT_ID}/service/${server.railwayServiceId}?environmentId=${env.RAILWAY_ENVIRONMENT_ID}`
      : null;

    return {
      serverId: server.id,
      serverName: server.name,
      gameName: server.game.displayName,
      railwayServiceId: server.railwayServiceId,
      railwayServiceExists,
      railwayDashboardUrl,
      canDelete: !railwayServiceExists
    };
  });
