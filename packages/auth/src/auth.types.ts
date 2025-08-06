import type {
  Session as PrismaSession,
  User as PrismaUser,
  UserRole
} from '@conductor/database';
import type z from 'zod';
import type { createAuth } from './auth';
import type { createAuthClient } from './auth.client';
import type { authClientConfigSchema, authConfigSchema } from './auth.config';

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

/**
 * Auth client configuration schema
 * This is the type of the configuration object passed to `createAuthClient`
 */
export type AuthClientConfig = z.infer<typeof authClientConfigSchema>;

/**
 * Auth client type
 * This is the type of the auth client instance created by `createAuthClient`
 */
export type AuthClient = ReturnType<typeof createAuthClient>;

/**
 * Session type with admin plugin fields
 * Note: PrismaSession already has impersonatedBy as string | null
 */
export interface Session extends PrismaSession {}

/**
 * User type - all admin plugin fields are already in PrismaUser
 * (role, banned, banReason, banExpires are defined in schema.prisma)
 */
export interface User extends PrismaUser {}

// Export the UserRole enum for use in components
export type { UserRole };
