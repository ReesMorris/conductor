import { protectedProcedure } from '@/trpc/procedures';
import { transformS3Url } from '@/utils';

/**
 * Get the current user's profile with transformed image URLs
 */
export const getProfile = protectedProcedure.query(({ ctx }) => {
  const user = ctx.user;

  // Transform the S3 key to a full URL before returning
  return {
    ...user,
    image: transformS3Url(user.image)
  };
});
