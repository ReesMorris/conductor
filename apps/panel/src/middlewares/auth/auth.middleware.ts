import { createLogger } from '@/libs/logger';
import { isPublicRoute } from '@/utils/is-public-route';
import { route } from '@/utils/route';
import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

const log = createLogger('auth-middleware');

export const auth = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // If the route is public, we don't need to check for authentication
  if (isPublicRoute(pathname)) {
    log.debug(`Public route accessed: ${pathname}`);
    return null;
  }

  // Check for the presence of a session cookie
  // NB: This does NOT check if the session is valid, only if it exists.
  const session = getSessionCookie(request);
  if (session) {
    log.debug('Authenticated session found');

    // User is authenticated, continue to the next middleware or route
    return null;
  }

  // The user is not authenticated, redirect to login
  log.debug(`No authenticated session found for route: ${pathname}`);
  return NextResponse.redirect(new URL(route('LOGIN'), request.url));
};
