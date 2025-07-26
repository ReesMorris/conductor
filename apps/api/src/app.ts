import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { errorHandler } from './middlewares';
import { routes } from './routes';

export const app = new Hono();

// Global middleware
app.use('*', logger());
app.use('*', cors());

// Error handling
app.onError(errorHandler);

// Routes
app.route('/', routes);
