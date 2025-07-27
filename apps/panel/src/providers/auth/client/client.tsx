'use client';

import { AuthContext } from '@/contexts';
import { createAuthClient } from 'better-auth/react';
import { useMemo } from 'react';
import type { ClientProps } from './client.types';

export const Client = ({ children, config }: ClientProps) => {
  const authClient = useMemo(() => {
    return createAuthClient({
      baseURL: config.baseURL
    });
  }, [config.baseURL]);

  return (
    <AuthContext.Provider value={authClient}>{children}</AuthContext.Provider>
  );
};
