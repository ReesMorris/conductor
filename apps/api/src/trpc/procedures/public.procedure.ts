import { procedure } from '../trpc';

/**
 * Public procedure - no authentication required
 *
 * Use this for endpoints that don't require user authentication,
 * such as public data fetching, health checks, etc.
 */
export const publicProcedure = procedure;
