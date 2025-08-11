import { env } from '@/env';
import { createRailwayService } from '@/services/railway';
import { decrypt } from '@/utils/encryption';
import { prisma } from '@conductor/database';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure } from '../../procedures';

const deleteServerSchema = z.object({
  serverId: z.string()
});

export const deleteServer = protectedProcedure
  .input(deleteServerSchema)
  .mutation(async ({ ctx, input }) => {
    const { serverId } = input;

    // Get the server and verify ownership
    const server = await prisma.gameServer.findFirst({
      where: {
        id: serverId,
        userId: ctx.session.userId
      }
    });

    if (!server) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Server not found or you do not have permission to delete it'
      });
    }

    // If server has Railway service, check if it still exists
    if (server.railwayServiceId) {
      const railwayConfig = await prisma.railway.findUnique({
        where: { id: 'railway_config' }
      });

      if (railwayConfig) {
        const accessToken = decrypt(railwayConfig.accessToken);
        const railway = createRailwayService(accessToken);

        try {
          // Check if the service still exists in Railway
          const services = await railway.getProjectServices(
            env.RAILWAY_PROJECT_ID
          );
          const serviceExists = services.project.services.edges.some(
            edge => edge.node.id === server.railwayServiceId
          );

          if (serviceExists) {
            throw new TRPCError({
              code: 'PRECONDITION_FAILED',
              message: 'Please delete the service from Railway first'
            });
          }
        } catch (error) {
          // If it's our precondition error, re-throw it
          if (
            error instanceof TRPCError &&
            error.code === 'PRECONDITION_FAILED'
          ) {
            throw error;
          }
          // Otherwise, log the error but continue - Railway might be down
          console.error('Failed to check Railway service status:', error);
        }
      }
    }

    // Delete the server from database (cascades to connections)
    await prisma.gameServer.delete({
      where: { id: serverId }
    });

    return {
      success: true,
      message: 'Server deleted successfully'
    };
  });
