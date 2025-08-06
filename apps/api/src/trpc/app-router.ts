import {
  preferencesRouter,
  profileRouter,
  railwayRouter,
  systemRouter
} from './routers';
import { createCallerFactory, router } from './trpc';

/**
 * Main application router
 */
export const appRouter = router({
  preferences: preferencesRouter,
  profile: profileRouter,
  railway: railwayRouter,
  system: systemRouter
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for internal use
 * This allows calling tRPC procedures directly from server code
 */
const createCaller = createCallerFactory(appRouter);

/**
 * Server-side caller with null context (for public procedures)
 * Used in middleware and other server-side code
 */
export const serverCaller = createCaller({
  user: null,
  session: null
});
