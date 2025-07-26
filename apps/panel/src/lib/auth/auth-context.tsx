'use client';

import type { ClientOptions } from 'better-auth';
import { createAuthClient } from 'better-auth/react';
import { createContext, useContext, useMemo } from 'react';

const AuthContext = createContext<
  ReturnType<typeof createAuthClient> | undefined
>(undefined);

export interface AuthClientProviderProps {
  config: ClientOptions;
  children: React.ReactNode;
}

export const AuthClientProvider = ({
  config,
  children
}: AuthClientProviderProps) => {
  const authClient = useMemo(() => {
    return createAuthClient({
      baseURL: config.baseURL
    });
  }, [config.baseURL]);

  return (
    <AuthContext.Provider value={authClient}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
