import { env } from '@/env';
import { getAuth } from '@/libs';
import { userTransformer } from '@/transformers';
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

// Handle all auth requests with response transformation
authRoutes.all('/*', async c => {
  const auth = await getAuth();
  const response = await auth.handler(c.req.raw);

  // Clone the response to modify it
  const body = await response.text();

  try {
    const data = JSON.parse(body);

    // Apply transformations to user data if it exists
    if (data.user) {
      data.user = userTransformer.transform(data.user);
    }

    // Return modified response
    return new Response(JSON.stringify(data), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  } catch {
    // If not JSON or no user data, return original response
    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  }
});
