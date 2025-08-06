import { router } from '@/trpc';
import { getOnboardingStatus } from './get-onboarding-status.route';
import { setAccessToken } from './set-access-token.route';

/**
 * Onboarding router for initial setup and configuration
 */
export const onboardingRouter = router({
  getOnboardingStatus,
  setAccessToken
});
