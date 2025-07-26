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

// Routes
app.route('/', routes);
