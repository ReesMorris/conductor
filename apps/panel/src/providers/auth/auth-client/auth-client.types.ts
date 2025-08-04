import type { AuthClientConfig } from '@conductor/auth';

export interface AuthClientProps {
  /**
   * The configuration for the auth client instance.
   */
  config: AuthClientConfig;

  /**
   * The children to render within the `AuthClient`.
   */
  children: React.ReactNode;
}
