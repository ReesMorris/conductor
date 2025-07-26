import { prisma } from '@/libs';
import type { PrismaClient } from '@conductor/database';
import { createMiddleware } from 'hono/factory';

// Type augmentation for Hono context
declare module 'hono' {
  interface ContextVariableMap {
    db: PrismaClient;
  }
}

/**
 * Middleware to inject Prisma client into Hono context.
 *
 * This middleware sets the `db` variable in the context to the Prisma client instance,
 * allowing access to the database throughout the request lifecycle.
 *
 * @returns A middleware function that sets the `db` variable in the context.
 */
export const dbMiddleware = createMiddleware(async (c, next) => {
  c.set('db', prisma);
  await next();
});
