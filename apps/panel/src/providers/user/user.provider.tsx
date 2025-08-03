'use client';

import { useSession } from '@/hooks';
import { trpc } from '@/providers/trpc';
import { useUserStore } from '@/stores';
import { useEffect } from 'react';
import type { UserProviderProps } from './user.types';

/**
 * Provider that syncs Better Auth session data with Zustand user store
 * This enables reactive updates to user profile data without page reloads
 */
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const setUser = useUserStore(state => state.setUser);

  // Fetch profile with transformed URLs when we have a session
  const { data: profile } = trpc.profile.getProfile.useQuery(undefined, {
    enabled: !!session?.user
  });

  // Sync profile data to store whenever it changes
  useEffect(() => {
    if (profile) {
      // Profile from API has transformed image URL, but store expects better-auth User type
      // We need to ensure the types match
      setUser(profile as any);
    } else if (!session?.user) {
      setUser(null);
    }
  }, [profile, session, setUser]);

  return children;
};
