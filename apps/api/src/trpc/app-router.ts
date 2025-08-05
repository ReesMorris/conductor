import { preferencesRouter, profileRouter, railwayRouter } from './routers';
import { router } from './trpc';

/**
 * Main application router
 */
export const appRouter = router({
  preferences: preferencesRouter,
  profile: profileRouter,
  railway: railwayRouter
});

export type AppRouter = typeof appRouter;
