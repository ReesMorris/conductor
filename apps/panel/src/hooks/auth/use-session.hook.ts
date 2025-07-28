'use client';

import { useAuth } from './use-auth.hook';

export const useSession = () => {
  return useAuth().useSession();
};
