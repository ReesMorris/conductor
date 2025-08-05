import { TRPCError } from '@trpc/server';
import { procedure } from '../trpc';

/**
 * Admin procedure - requires authenticated user with admin role
 *
 * Use this for endpoints that require user authentication and admin role.
 * Will throw UNAUTHORIZED error if user is not authenticated or not an admin.
 */
export const adminProcedure = procedure.use(({ ctx, next }) => {
  if (!ctx.user || !ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action'
    });
  }

  if (ctx.user.role !== 'admin') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You must be an admin to perform this action'
    });
  }

  return next({
    ctx: {
      user: ctx.user,
      session: ctx.session
    }
  });
});
