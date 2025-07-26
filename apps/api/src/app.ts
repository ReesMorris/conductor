import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { dbMiddleware, errorHandler } from './middlewares';
import { routes } from './routes';

export const app = new Hono();

// Global middleware
app.use('*', logger());
app.use('*', cors());
app.use('*', dbMiddleware);

// Error handling
app.onError(errorHandler);

// Routes
app.route('/', routes);
