import { Hono } from 'hono';
import { healthRoutes } from './health';

const routes = new Hono();

routes.route('/health', healthRoutes);

export { routes };
