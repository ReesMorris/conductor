'use client';

import { useUserStore } from '@/stores';
import type { User } from '@conductor/auth';
import { useSession } from '../auth';

/**
 * Hook that merges Better Auth session data with Zustand user store
 * Provides reactive user data that updates immediately when profile changes
 */
export const useUser = () => {
  const { data: session, ...sessionRest } = useSession();
  const storeUser = useUserStore(state => state.user);
  const updateUser = useUserStore(state => state.updateUser);

  // Type cast the session user to include role and other admin fields
  // These fields are added by the admin plugin but not properly typed by better-auth
  const typedSessionUser = session?.user as User | undefined;

  // Merge session and store data, with store taking precedence for mutable fields
  const user = typedSessionUser
    ? {
        ...typedSessionUser,
        // Override with store data if available
        ...(storeUser && {
          image: storeUser.image,
          name: storeUser.name,
          email: storeUser.email,
          timeZone: storeUser.timeZone
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
