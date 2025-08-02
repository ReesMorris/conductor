import type { auth } from '@/libs';

/**
 * Type for the internal user representation (from database/auth)
 */
export type UserInternal = typeof auth.$Infer.Session.user;

/**
 * Type for the API response user representation
 */
export type UserResponse = Omit<UserInternal, 'image'> & {
  image: string | null;
};
