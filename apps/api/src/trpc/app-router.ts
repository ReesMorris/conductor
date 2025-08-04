import { preferencesRouter, profileRouter } from './routers';
import { router } from './trpc';

/**
 * Main application router
 */
export const appRouter = router({
  preferences: preferencesRouter,
  profile: profileRouter
});

export type AppRouter = typeof appRouter;
