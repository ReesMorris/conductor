import type {
  Session as PrismaSession,
  User as PrismaUser
} from '@conductor/database';
import type z from 'zod';
import type { createAuth } from './auth';
import type { authConfigSchema } from './auth.config';

/**
 * Auth instance type
 * This is the type of the auth instance created by `createAuth`
 */
export type Auth = ReturnType<typeof createAuth>;

/**
 * Auth configuration schema
 * This is the type of the configuration object passed to `createAuth`
 */
export type AuthConfig = z.infer<typeof authConfigSchema>;

export interface Session extends PrismaSession {}
export interface User extends PrismaUser {}
