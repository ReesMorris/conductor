import { Routes } from '@/constants';
import { createLogger } from '@/libs/logger';
import { type NextRequest, NextResponse } from 'next/server';
import { checkSetupStatus } from './utils';

const log = createLogger('onboarding-middleware');

// Store the onboarding completion status in memory to avoid repeated checks
let isOnboardingComplete = false;

/**
 * Setup check middleware that redirects to onboarding if system setup is incomplete.
 *
 * This middleware:
 * - Checks if the system has been set up (users exist and Railway is configured)
 * - Redirects to /onboarding if setup is incomplete
 * - Allows access to public routes and onboarding page
 * - Runs before auth middleware to handle initial system setup
 */
export const onboarding = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // If the setup is already complete, skip the check
  if (isOnboardingComplete) {
    log.debug('Onboarding already complete, skipping setup check');
    return null;
  }

  // Skip setup check if we're already on the onboarding page
  if (pathname.includes(Routes.ONBOARDING)) {
    log.debug('Already on onboarding page, skipping setup check');
    return null;
  }

  // Check setup status from the API
  const setupStatus = await checkSetupStatus();
  log.debug(`Setup status: ${setupStatus}`);

  // The user's session may have expired, so we allow access to the login page
  if (setupStatus !== 'NO_USERS' && pathname.includes(Routes.LOGIN)) {
    log.debug('Setup is not NO_USERS, allowing access to login page');
    return null;
  }

  // If we can't determine setup status, allow the request to continue
  // This prevents blocking the app if the API is temporarily unavailable
  if (!setupStatus) {
    log.warn('Unable to determine setup status, allowing request to continue');
    return null;
  }

  // If setup is incomplete, redirect to onboarding
  if (setupStatus !== 'COMPLETE') {
    log.debug('Setup incomplete, redirecting to onboarding');
    return NextResponse.redirect(new URL(Routes.ONBOARDING, request.url));
  }

  // Setup is complete, continue to next middleware
  log.debug('Setup complete, proceeding to next middleware');
  isOnboardingComplete = true;
  return null;
};
