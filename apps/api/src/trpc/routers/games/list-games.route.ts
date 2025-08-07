import { prisma } from '@/libs';
import { gamesTransformer } from '@/transformers/games';
import { protectedProcedure } from '@/trpc/procedures';

/**
 * Get the list of all available games
 */
export const listGames = protectedProcedure.query(async () => {
  const games = await prisma.game.findMany({
    orderBy: {
      displayName: 'asc'
    }
  });

  return gamesTransformer.transformMany(games);
});
