import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import type { TRPCContext } from './context';

/**
 * Initialize tRPC with context and superjson transformer
 */
const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof Error ? error.cause.message : undefined
      }
    };
  }
});

/**
 * Create routers and base procedure
 */
export const router = t.router;
export const procedure = t.procedure;

/**
 * Create caller factory for server-side procedure calls
 */
export const createCallerFactory = t.createCallerFactory;
