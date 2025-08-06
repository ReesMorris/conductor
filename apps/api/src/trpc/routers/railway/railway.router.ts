import { router } from '@/trpc';
import { getRailwayConfig } from './get-railway-config.route';
import { initialRailwaySetup } from './initial-railway-setup.route';
import { updateRailwayConfig } from './update-railway-config.route';

/**
 * Railway configuration router
 */
export const railwayRouter = router({
  getConfig: getRailwayConfig,
  updateConfig: updateRailwayConfig,
  initialSetup: initialRailwaySetup
});
