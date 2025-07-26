import 'server-only';

import { AuthClientProvider } from '@/lib/auth';
import { getAuthConfig } from '@/lib/auth/utils';

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const config = getAuthConfig();

  return <AuthClientProvider config={config}>{children}</AuthClientProvider>;
};
