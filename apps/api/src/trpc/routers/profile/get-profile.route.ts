import { userTransformer } from '@/transformers';
import { protectedProcedure } from '@/trpc/procedures';

/**
 * Get the current user's profile with transformed image URLs
 */
export const getProfile = protectedProcedure.query(({ ctx }) => {
  const user = ctx.user;

  // Use the transformer to prepare the user for API response
  return userTransformer.transform(user);
});
