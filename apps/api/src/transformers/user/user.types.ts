import type { User } from '@conductor/auth';

/**
 * Type for the internal user representation (from database/auth)
 */
export type UserInternal = User;

/**
 * Type for the API response user representation
 */
export type UserResponse = Omit<UserInternal, 'image'> & {
  image: string | null;
};
