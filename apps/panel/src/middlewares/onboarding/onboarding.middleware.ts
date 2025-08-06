import { Routes } from '@/constants';
import { type NextRequest, NextResponse } from 'next/server';
import { checkSetupStatus } from './utils';

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

  // Skip setup check if we're already on the onboarding page
  if (pathname.includes(Routes.ONBOARDING)) {
    return null;
  }

  // Check setup status from the API
  const setupStatus = await checkSetupStatus();

  // If we can't determine setup status, allow the request to continue
  // This prevents blocking the app if the API is temporarily unavailable
  if (!setupStatus) {
    return null;
  }

  // If setup is incomplete, redirect to onboarding
  if (!setupStatus.isComplete) {
    return NextResponse.redirect(new URL(Routes.ONBOARDING, request.url));
  }

  // Setup is complete, continue to next middleware
  return null;
};
