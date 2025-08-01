import type { User } from 'better-auth';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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

const initialState: Pick<UserState, 'user'> = {
  user: null
};

export const useUserStore = create<UserState>()(
  devtools(
    set => ({
      ...initialState,

      setUser: user => set({ user }),

      updateUser: updates =>
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null
        })),

      reset: () => set(initialState)
    }),
    {
      name: 'user-store'
    }
  )
);
