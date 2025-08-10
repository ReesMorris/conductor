import { prisma } from '@conductor/database';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure } from '../../procedures';

const deployServerSchema = z.object({
  gameType: z.string(),
  serverName: z.string(),
  domain: z.string().optional()
});

export const deployServer = protectedProcedure
  .input(deployServerSchema)
  .mutation(async ({ ctx, input }) => {
    const { gameType, serverName, domain } = input;

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
        domain,
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
      connectionUrl: '// TODO: Generate connection URL'
    };
  });
