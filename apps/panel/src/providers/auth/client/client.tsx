'use client';

import { AuthContext } from '@/contexts';
import { authClient } from '@/libs';
import { useMemo } from 'react';
import type { ClientProps } from './client.types';

export const Client = ({ children, config }: ClientProps) => {
  // Memoize the auth client to avoid unnecessary re-creations
  const authClientValue = useMemo(() => {
    return authClient(config);
  }, [config]);

  return (
    <AuthContext.Provider value={authClientValue}>
      {children}
    </AuthContext.Provider>
  );
};
