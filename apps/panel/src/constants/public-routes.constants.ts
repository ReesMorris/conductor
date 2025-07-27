import { Routes } from './routes.constants';

/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES = new Set([
  Routes.LOGIN,
  Routes.REGISTER,
  Routes.HEALTH_CHECK
]);
