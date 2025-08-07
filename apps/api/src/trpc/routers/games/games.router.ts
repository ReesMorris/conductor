import { router } from '@/trpc';
import { listGames } from './list-games.route';

/**
 * Games router
 */
export const gamesRouter = router({
  list: listGames
});
