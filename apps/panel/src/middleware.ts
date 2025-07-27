import type { NextRequest } from 'next/server';
import { auth, I18nMiddleware } from './middlewares';

// The regex matcher to exclude API routes, Next.js internals, and static files from the middleware
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

export default async function middleware(request: NextRequest) {
  // I18n Middleware
  const res = I18nMiddleware(request);

  return (
    // Auth Middleware
    (await auth(request)) ||
    // No middlewares hit, continue with the request
    res
  );
}
