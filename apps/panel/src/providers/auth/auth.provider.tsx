import 'server-only';

import type { AuthProviderProps } from './auth.types';
import { AuthClient } from './auth-client';
import { getAuthConfig } from './utils';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // We need to fetch the config on the server, then pass it to the client.
  const config = getAuthConfig();

  return <AuthClient config={config}>{children}</AuthClient>;
};
