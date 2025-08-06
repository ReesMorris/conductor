import { router } from '@/trpc';
import { getSetupStatus } from './get-setup-status.route';

/**
 * System router for application-level operations
 */
export const systemRouter = router({
  getSetupStatus
});
