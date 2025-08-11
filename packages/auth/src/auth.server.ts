import { prisma } from '@conductor/database';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
import { createRedisStorage } from './auth.redis';
import type { AuthConfig } from './auth.types';
import { makeFirstUserAdmin } from './hooks';

/**
 * Create a configured auth instance
 * @param config - The configuration for the auth instance
 * @returns The configured auth instance
 */
export const createAuth = async (
  config: AuthConfig
): Promise<ReturnType<typeof betterAuth>> => {
  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql'
    }),
    secondaryStorage: await createRedisStorage(config.redisUrl),
    baseURL: config.betterAuthUrl,
    basePath: '/auth',
    secret: config.betterAuthSecret,
    trustedOrigins: [config.frontendUrl],
    emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({ user, url, token }) => {
        // TODO: Replace with actual email service
        console.log('Password reset requested for:', user.email);
        console.log('Reset URL:', url);
        console.log('Reset token:', token);

        // Add a fake delay to simulate email sending
        await new Promise(resolve => setTimeout(resolve, 100));
      }
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
      additionalFields: {
        timeZone: {
          type: 'string',
          required: false,
          defaultValue: 'Europe/London'
        }
      },
      changeEmail: {
        enabled: true
      }
    },
    plugins: [admin()]
  });
};
