import { env } from '@/env';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
import { prisma } from '../db';
import { makeFirstUserAdmin } from './hooks';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  baseURL: env.BETTER_AUTH_URL,
  basePath: '/auth',
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [env.FRONTEND_URL],
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
  plugins: [admin()]
}) as any; // Type assertion to avoid TS4023 error

export type Auth = typeof auth;
export type Session = any; // Simplified for build
