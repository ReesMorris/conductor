import { gameServerTransformer } from '@/transformers/game-server';
import { prisma } from '@conductor/database';
import { protectedProcedure } from '../../procedures';

export const listServers = protectedProcedure.query(async () => {
  const servers = await prisma.gameServer.findMany({
    include: {
      game: true,
      connections: {
        orderBy: {
          isDefault: 'desc'
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return gameServerTransformer.transformMany(servers);
});
