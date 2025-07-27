import 'server-only';

import type { AuthProviderProps } from './auth.types';
import { Client } from './client';
import { getAuthConfig } from './utils';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const config = getAuthConfig();

  return <Client config={config}>{children}</Client>;
};
