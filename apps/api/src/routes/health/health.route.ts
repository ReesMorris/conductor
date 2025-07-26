import { checkDatabaseConnection } from '@/libs/db';
import { Hono } from 'hono';

export const healthRoutes = new Hono();

healthRoutes.get('/', async c => {
  const dbHealthy = await checkDatabaseConnection();
  if (!dbHealthy) {
    return c.json({ ready: false, reason: 'Database not connected' }, 503);
  }

  return c.json({ ready: true });
});
