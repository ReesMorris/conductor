import { Hono } from 'hono';
import { authRoutes } from './auth';
import { healthRoutes } from './health';

const routes = new Hono();

routes.route('/auth', authRoutes);
routes.route('/health', healthRoutes);

export { routes };
