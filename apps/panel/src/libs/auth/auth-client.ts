import type { ClientOptions } from 'better-auth';
import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

/**
 * Creates an authentication client with admin privileges.
 *
 * @param config - The configuration options for the auth client.
 * @returns An instance of the auth client configured with admin privileges.
 */
export const authClient = (config: ClientOptions) => {
  return createAuthClient({
    baseURL: config.baseURL,
    plugins: [adminClient()]
  });
};
