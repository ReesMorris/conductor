import type { Session, User } from '@conductor/auth';

export interface AuthVariables {
  /**
   * The authenticated user object, or null if not authenticated.
   */
  user: User | null;

  /**
   * The current session object, or null if no session exists.
   */
  session: Session | null;
}
