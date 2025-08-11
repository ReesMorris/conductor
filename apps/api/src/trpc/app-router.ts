import {
  gamesRouter,
  onboardingRouter,
  preferencesRouter,
  profileRouter,
  railwayRouter,
  serversRouter,
  workspaceRouter
} from './routers';
import { router } from './trpc';

/**
 * Main application router
 */
export const appRouter = router({
  games: gamesRouter,
  preferences: preferencesRouter,
  profile: profileRouter,
  railway: railwayRouter,
  onboarding: onboardingRouter,
  servers: serversRouter,
  workspace: workspaceRouter
});

export type AppRouter = typeof appRouter;
