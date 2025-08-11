import { router } from '../../trpc';
import { getSettings } from './get-settings.route';
import { updateSettings } from './update-settings.route';

export const workspaceRouter = router({
  getSettings,
  updateSettings
});
