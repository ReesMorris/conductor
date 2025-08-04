import { router } from '@/trpc';
import { updatePreferences } from './update-preferences.route';

export const preferencesRouter = router({
  updatePreferences
});
