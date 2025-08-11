import { env } from '@/env';
import type { Auth } from '@conductor/auth';
import { createAuth } from '@conductor/auth/server';

/**
 * Singleton auth instance to prevent multiple Redis connections
 */
let authInstance: Auth | undefined;

/**
 * Configured auth instance for the API
 * Uses singleton pattern to ensure only one Redis connection is created
 */
export const getAuth = async (): Promise<Auth> => {
  if (!authInstance) {
    authInstance = await createAuth({
      betterAuthUrl: env.BETTER_AUTH_URL,
      betterAuthSecret: env.BETTER_AUTH_SECRET,
      frontendDomain: env.FRONTEND_DOMAIN,
      frontendUrl: env.FRONTEND_URL,
      redisUrl: env.REDIS_URL
    });
  }
  return authInstance;
};
