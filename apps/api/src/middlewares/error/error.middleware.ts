import { logger } from '@/libs';
import type { ErrorHandler } from 'hono';

export const errorHandler: ErrorHandler = (err, c) => {
  const requestId = c.get('requestId');

  logger.error({
    type: 'error',
    requestId,
    error: {
      message: err.message,
      stack: err.stack,
      name: err.name
    },
    path: c.req.path,
    method: c.req.method
  });

  return c.json(
    {
      error: err.message || 'Internal Server Error',
      requestId,
      status: 500
    },
    500
  );
};
