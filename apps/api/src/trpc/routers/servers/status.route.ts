import { prisma } from '@conductor/database';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure } from '../../procedures';

export const getServerStatus = protectedProcedure
  .input(
    z.object({
      serverId: z.string()
    })
  )
  .query(async ({ ctx, input }) => {
    const server = await prisma.gameServer.findFirst({
      where: {
        id: input.serverId,
        userId: ctx.session.userId
      },
      include: {
        game: true,
        connections: {
          where: { enabled: true }
        }
      }
    });

    if (!server) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Server not found'
      });
    }

    // In production, this would check actual Railway API or container status
    // For now, return mock status based on server state
    const status = server.enabled ? 'running' : 'stopped';

    // Mock connection counts
    const activeConnections = server.connections.map(conn => ({
      id: conn.id,
      name: conn.name || 'Default',
      domain: conn.domain,
      enabled: conn.enabled,
      activeClients: 0
    }));

    return {
      id: server.id,
      name: server.name,
      game: server.game.displayName,
      status,
      enabled: server.enabled,
      connections: activeConnections,
      railwayUrl: server.railwayUrl,
      createdAt: server.createdAt,
      updatedAt: server.updatedAt
    };
  });
