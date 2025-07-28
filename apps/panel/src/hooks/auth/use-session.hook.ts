'use client';

import { useAuth } from './use-auth.hook';

export const useSession = () => {
  const auth = useAuth();
  return auth.useSession();
};
