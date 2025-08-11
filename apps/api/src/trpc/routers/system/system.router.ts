import { router } from '../../trpc';
import { checkForUpdates } from './check-for-updates.route';
import { getSystemInfo } from './get-system-info.route';

export const systemRouter = router({
  checkForUpdates,
  getSystemInfo
});
