import { TRPCError } from '@trpc/server';
import { procedure } from '../trpc';

/**
 * Protected procedure - requires authenticated user
 *
 * Use this for endpoints that require user authentication.
 * Will throw UNAUTHORIZED error if user is not authenticated.
 */
export const protectedProcedure = procedure.use(({ ctx, next }) => {
  if (!ctx.user || !ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action'
    });
  }

  return next({
    ctx: {
      user: ctx.user,
      session: ctx.session
    }
  });
});
