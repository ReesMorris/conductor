import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient as create } from 'better-auth/react';
import type { AuthClientConfig } from './auth.types';

/**
 * Create a configured auth client instance
 * @param config - The configuration for the auth client instance
 * @returns The configured auth client instance
 */
export const createAuthClient = (config: AuthClientConfig) => {
  return create({
    ...config,
    plugins: [adminClient()]
  });
};
