import { router } from '@/trpc';
import { getPresignedUrl } from './get-presigned-url';
import { getProfile } from './get-profile';
import { removePhoto } from './remove-photo';
import { uploadPhoto } from './upload-photo';

export const profileRouter = router({
  getPresignedUrl,
  getProfile,
  uploadPhoto,
  removePhoto
});
