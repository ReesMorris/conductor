import { router } from './trpc';

/**
 * Main application router
 */
export const appRouter = router({});

export type AppRouter = typeof appRouter;
