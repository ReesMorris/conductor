import { prisma } from '@conductor/database';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
import type { AuthConfig } from './auth.types';
import { makeFirstUserAdmin } from './hooks';

/**
 * Create a configured auth instance
 * @param config - The configuration for the auth instance
 * @returns The configured auth instance
 */
export const createAuth = (config: AuthConfig) => {
  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql'
    }),
    baseURL: config.betterAuthUrl,
    basePath: '/auth',
    secret: config.betterAuthSecret,
    trustedOrigins: [config.frontendUrl],
    emailAndPassword: {
      enabled: true
    },
    databaseHooks: {
      user: {
        create: {
          before: async user => {
            const newUser = await makeFirstUserAdmin(user);
            return newUser;
          }
        }
      }
    },
    user: {
      changeEmail: {
        enabled: true
      }
    },
    plugins: [admin()]
  });
};
