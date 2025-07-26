import type { auth } from '@/libs';

export interface AuthVariables {
  /**
   * The authenticated user object, or null if not authenticated.
   */
  user: typeof auth.$Infer.Session.user | null;

  /**
   * The current session object, or null if no session exists.
   */
  session: typeof auth.$Infer.Session.session | null;
}
