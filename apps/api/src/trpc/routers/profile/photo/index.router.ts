import { router } from '@/trpc';
import { getPresignedUrl } from './get-presigned-url.route';
import { remove } from './remove.route';
import { upload } from './upload.route';

export const photoRouter = router({
  getPresignedUrl,
  upload,
  remove
});
