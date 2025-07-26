import { env } from '@/env';
import { auth } from '@/libs';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

export const authRoutes = new Hono();

// Configure CORS for auth routes with credentials
authRoutes.use(
  '/*',
  cors({
    origin: env.FRONTEND_URL,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true
  })
);

// Handle all auth requests
authRoutes.all('/*', c => {
  return auth.handler(c.req.raw);
});
