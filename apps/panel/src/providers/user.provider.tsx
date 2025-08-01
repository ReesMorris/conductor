'use client';

import { useSession } from '@/hooks';
import { useUserStore } from '@/stores';
import { useEffect } from 'react';

export interface UserProviderProps {
  children: React.ReactNode;
}

/**
 * Provider that syncs Better Auth session data with Zustand user store
 * This enables reactive updates to user profile data without page reloads
 */
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const setUser = useUserStore(state => state.setUser);

  // Sync session user data to store whenever it changes
  useEffect(() => {
    if (session?.user) {
      setUser({ ...session.user });
    } else {
      setUser(null);
    }
  }, [session, setUser]);

  return children;
};
