'use client';

import { useUserStore } from '@/stores';
import { useSession } from '../auth';

/**
 * Hook that merges Better Auth session data with Zustand user store
 * Provides reactive user data that updates immediately when profile changes
 */
export const useUser = () => {
  const { data: session, ...sessionRest } = useSession();
  const storeUser = useUserStore(state => state.user);
  const updateUser = useUserStore(state => state.updateUser);

  // Merge session and store data, with store taking precedence for mutable fields
  const user = session?.user
    ? {
        ...session.user,
        // Override with store data if available
        ...(storeUser && {
          image: storeUser.image,
          name: storeUser.name
        })
      }
    : null;

  return {
    data: user ? { ...session, user } : null,
    user,
    updateUser,
    ...sessionRest
  };
};
