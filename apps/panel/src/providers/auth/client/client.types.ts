import type { ClientOptions } from 'better-auth';

export interface ClientProps {
  /**
   * The configuration options for the auth client.
   */
  config: ClientOptions;

  /**
   * The children components to be rendered within the AuthProvider.
   */
  children: React.ReactNode;
}
