import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { env } from './env';
import {
  type AuthVariables,
  authMiddleware,
  dbMiddleware,
  errorHandler,
  loggingMiddleware
} from './middlewares';
import { routes } from './routes';
import { appRouter, createContext } from './trpc';

export const app = new Hono<{ Variables: AuthVariables }>();

// Global middleware
app.use('*', loggingMiddleware);
app.use(
  '*',
  cors({
    origin: env.FRONTEND_URL,
    credentials: true
  })
);
app.use('*', dbMiddleware);
app.use('*', authMiddleware);

// Error handling
app.onError(errorHandler);

// tRPC handler
app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext: (_opts, c) => {
      // The Hono adapter expects a plain object return type
      // Our context returns the exact shape needed
      return createContext(c) as unknown as Record<string, unknown>;
    }
  })
);

// Routes
app.route('/', routes);
