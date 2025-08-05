import type { User } from '@conductor/auth';

export interface AuthWrapperProps {
  /**
   * The content to render once authentication is loaded
   */
  children: React.ReactNode;

  /**
   * The skeleton component to render while authentication is loading
   */
  skeleton: React.ReactNode;

  /**
   * Render the skeleton on top of the children in debug mode
   * @default false
   */
  debug?: boolean;

  /**
   * The role of the user required to access the children
   */
  requiredRole?: User['role'];
}
