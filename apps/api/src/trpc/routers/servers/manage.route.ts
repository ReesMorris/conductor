import { prisma } from '@conductor/database';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure } from '../../procedures';

const serverActionSchema = z.object({
  serverId: z.string()
});

export const startServer = protectedProcedure
  .input(serverActionSchema)
  .mutation(async ({ ctx, input }) => {
    const server = await prisma.gameServer.findFirst({
      where: {
        id: input.serverId,
        userId: ctx.session.userId
      }
    });

    if (!server) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Server not found'
      });
    }

    // Update server to enabled state
    await prisma.gameServer.update({
      where: { id: input.serverId },
      data: { enabled: true }
    });

    // In production, this would start the Railway service
    // For now, just return success
    return {
      success: true,
      message: 'Server started successfully'
    };
  });

export const stopServer = protectedProcedure
  .input(serverActionSchema)
  .mutation(async ({ ctx, input }) => {
    const server = await prisma.gameServer.findFirst({
      where: {
        id: input.serverId,
        userId: ctx.session.userId
      }
    });

    if (!server) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Server not found'
      });
    }

    // Update server to disabled state
    await prisma.gameServer.update({
      where: { id: input.serverId },
      data: { enabled: false }
    });

    // In production, this would stop the Railway service
    // For now, just return success
    return {
      success: true,
      message: 'Server stopped successfully'
    };
  });

export const restartServer = protectedProcedure
  .input(serverActionSchema)
  .mutation(async ({ ctx, input }) => {
    const server = await prisma.gameServer.findFirst({
      where: {
        id: input.serverId,
        userId: ctx.session.userId
      }
    });

    if (!server) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Server not found'
      });
    }

    // In production, this would restart the Railway service
    // For now, just return success
    return {
      success: true,
      message: 'Server restarted successfully'
    };
  });
