import { env } from '@/env';
import type { Auth } from '@conductor/auth';
import { createAuth } from '@conductor/auth';

/**
 * Configured auth instance for the API
 */
export const auth = createAuth({
  betterAuthUrl: env.BETTER_AUTH_URL,
  betterAuthSecret: env.BETTER_AUTH_SECRET,
  frontendUrl: env.FRONTEND_URL
}) as Auth;

export type { Auth, Session } from '@conductor/auth';
