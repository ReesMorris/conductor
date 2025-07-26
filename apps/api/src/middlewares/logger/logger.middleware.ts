import { env } from '@/env';
import { logger } from '@/libs';
import type { MiddlewareHandler } from 'hono';

/**
 * Middleware for logging HTTP requests and responses with tracing support.
 *
 * - Generates a unique `requestId` for each request and attaches it to the context for tracing.
 * - Logs incoming request details including method, path, query parameters, and user agent.
 * - Logs outgoing response details including status and duration.
 *
 * @param c - The Hono context object.
 * @param next - The next middleware function in the stack.
 *
 * @remarks
 * This middleware augments the Hono context with a `requestId` property for request tracing.
 */
export const loggingMiddleware: MiddlewareHandler = async (c, next) => {
  const start = Date.now();
  const requestId = crypto.randomUUID();

  // Add request ID to context for tracing
  c.set('requestId', requestId);

  // Skip request/response logging if disabled
  if (!env.LOG_REQUESTS) {
    await next();
    return;
  }

  // Log request
  logger.info({
    type: 'request',
    requestId,
    method: c.req.method,
    path: c.req.path,
    query: c.req.query(),
    userAgent: c.req.header('user-agent')
  });

  await next();

  // Log response
  const duration = Date.now() - start;
  logger.info({
    type: 'response',
    requestId,
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    duration
  });
};

// Type augmentation
declare module 'hono' {
  interface ContextVariableMap {
    requestId: string;
  }
}
