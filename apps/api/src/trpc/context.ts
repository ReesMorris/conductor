import type { AuthVariables } from '@/middlewares';
import type { Session, User } from '@conductor/auth';
import type { Context } from 'hono';

/**
 * Context available in all tRPC procedures
 */
export interface TRPCContext {
  user: User | null;
  session: Session | null;
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
