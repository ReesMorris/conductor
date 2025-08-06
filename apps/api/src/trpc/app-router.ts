import {
  onboardingRouter,
  preferencesRouter,
  profileRouter,
  railwayRouter
} from './routers';
import { router } from './trpc';

/**
 * Main application router
 */
export const appRouter = router({
  preferences: preferencesRouter,
  profile: profileRouter,
  railway: railwayRouter,
  onboarding: onboardingRouter
});

export type AppRouter = typeof appRouter;
