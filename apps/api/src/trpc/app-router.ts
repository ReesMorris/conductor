import {
  preferencesRouter,
  profileRouter,
  railwayRouter,
  systemRouter
} from './routers';
import { router } from './trpc';

/**
 * Main application router
 */
export const appRouter = router({
  preferences: preferencesRouter,
  profile: profileRouter,
  railway: railwayRouter,
  system: systemRouter
});

export type AppRouter = typeof appRouter;
