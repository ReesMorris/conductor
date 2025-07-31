import type { auth } from '@/libs';
import type { AuthVariables } from '@/middlewares';
import type { Context } from 'hono';

/**
 * Context available in all tRPC procedures
 */
export interface TRPCContext {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
}

/**
 * Create tRPC context from Hono context
 */
export const createContext = (
  c: Context<{ Variables: AuthVariables }>
): TRPCContext => {
  return {
    user: c.get('user'),
    session: c.get('session')
  };
};
