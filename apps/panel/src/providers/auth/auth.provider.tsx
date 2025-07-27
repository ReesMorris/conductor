import 'server-only';

import { getAuthConfig } from '@/lib/auth/utils';
import type { AuthProviderProps } from './auth.types';
import { Client } from './client';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const config = getAuthConfig();

  return <Client config={config}>{children}</Client>;
};
