import { router } from '@/trpc';
import { getProfile } from './get-profile.route';
import { photoRouter } from './photo';

export const profileRouter = router({
  getProfile,
  photo: photoRouter
});
