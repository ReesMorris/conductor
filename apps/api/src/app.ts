import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { dbMiddleware, errorHandler, loggingMiddleware } from './middlewares';
import { routes } from './routes';

export const app = new Hono();

// Global middleware
app.use('*', loggingMiddleware);
app.use('*', cors());
app.use('*', dbMiddleware);

// Error handling
app.onError(errorHandler);

// Routes
app.route('/', routes);
