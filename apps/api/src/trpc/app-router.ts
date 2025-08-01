import { profileRouter } from './routers';
import { router } from './trpc';

/**
 * Main application router
 */
export const appRouter = router({
  profile: profileRouter
});

export type AppRouter = typeof appRouter;
