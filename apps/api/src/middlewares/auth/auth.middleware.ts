import { getAuth } from '@/libs';
import type { Session, User } from '@conductor/auth';
import type { Context, Next } from 'hono';
import type { AuthVariables } from './auth.types';

/**
 * Authentication middleware that populates the request context with user session data.
 *
 * This middleware attempts to retrieve the current user's session from Better Auth
 * and makes it available throughout the request lifecycle via Hono's context.
 *
 * @remarks
 * - Does not block requests - unauthenticated requests will have null user/session
 * - Extracts session from cookies/headers automatically via Better Auth
 * - Handles errors gracefully by setting null values
 *
 * @param c - Hono context object with AuthVariables
 * @param next - Next middleware function
 * @returns Promise that resolves when middleware completes
 */
export const authMiddleware = async (
  c: Context<{ Variables: AuthVariables }>,
  next: Next
) => {
  try {
    const auth = await getAuth();
    const session = await auth.api.getSession({
      headers: c.req.raw.headers
    });

    if (!session) {
      c.set('user', null);
      c.set('session', null);
      return next();
    }

    c.set('user', session.user as User);
    c.set('session', session.session as Session);
  } catch {
    // Authentication errors are non-blocking
    // Set null values to indicate no authenticated user
    c.set('user', null);
    c.set('session', null);
  }

  return next();
};
