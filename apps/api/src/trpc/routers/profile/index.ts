import { router } from '@/trpc';
import { getPresignedUrl } from './get-presigned-url';
import { uploadPhoto } from './upload-photo';

export const profileRouter = router({
  getPresignedUrl,
  uploadPhoto
});
