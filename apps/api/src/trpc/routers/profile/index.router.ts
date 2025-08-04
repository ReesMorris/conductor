import { router } from '@/trpc';
import { getProfile } from './get-profile.route';
import { photoRouter } from './photo';
import { updateProfile } from './update-profile.route';
import { updateSecuritySettings } from './update-security-settings.route';

export const profileRouter = router({
  getProfile,
  updateProfile,
  updateSecuritySettings,
  photo: photoRouter
});
