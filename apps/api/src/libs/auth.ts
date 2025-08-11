import { env } from '@/env';
import type { Auth } from '@conductor/auth';
import { createAuth } from '@conductor/auth/server';

/**
 * Configured auth instance for the API
 */
export const getAuth = () =>
  createAuth({
    betterAuthUrl: env.BETTER_AUTH_URL,
    betterAuthSecret: env.BETTER_AUTH_SECRET,
    frontendDomain: env.FRONTEND_DOMAIN,
    frontendUrl: env.FRONTEND_URL,
    redisUrl: env.REDIS_URL
  }) as Auth;

export type { Auth, Session } from '@conductor/auth';
