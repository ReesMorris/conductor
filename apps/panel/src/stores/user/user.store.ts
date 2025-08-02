import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UserState } from './user.types';

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
