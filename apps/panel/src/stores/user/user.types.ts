import type { User } from 'better-auth';

export interface UserState {
  /**
   * User profile data that can be updated
   */
  user: User | null;

  /**
   * Set the complete user data
   */
  setUser: (user: UserState['user']) => void;

  /**
   * Update specific user fields
   */
  updateUser: (updates: Partial<NonNullable<UserState['user']>>) => void;

  /**
   * Reset the store to initial state
   */
  reset: () => void;
}
