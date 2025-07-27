import { type NextRequest, NextResponse } from 'next/server';
import { getSession, isPublicRoute } from './utils';

export const auth = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // If the route is public, we don't need to check for authentication
  if (isPublicRoute(pathname)) {
    return null;
  }

  // Get the session from the request
  const session = await getSession(request);
  if (session) {
    return null;
  }

  // The user is not authenticated, redirect to login
  // TODO: Don't make this a magic string
  return NextResponse.redirect(new URL('/login', request.url));
};
