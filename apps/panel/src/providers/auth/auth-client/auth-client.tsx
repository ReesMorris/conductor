'use client';

import { AuthContext } from '@/contexts';
import { createAuthClient } from '@conductor/auth';
import type { AuthClientProps } from './auth-client.types';

export const AuthClient: React.FC<AuthClientProps> = ({ config, children }) => {
  const client = createAuthClient(config);

  return <AuthContext.Provider value={client}>{children}</AuthContext.Provider>;
};
