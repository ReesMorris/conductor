import {
  gamesRouter,
  onboardingRouter,
  preferencesRouter,
  profileRouter,
  railwayRouter,
  serversRouter,
  systemRouter,
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
  system: systemRouter,
  workspace: workspaceRouter
});

export type AppRouter = typeof appRouter;
