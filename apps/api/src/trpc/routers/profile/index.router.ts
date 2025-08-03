import { router } from '@/trpc';
import { getProfile } from './get-profile.route';
import { photoRouter } from './photo';
import { updateProfile } from './update-profile.route';

export const profileRouter = router({
  getProfile,
  updateProfile,
  photo: photoRouter
});
