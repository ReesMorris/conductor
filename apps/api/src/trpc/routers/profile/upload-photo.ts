import { protectedProcedure } from '@/trpc/procedures';
import { z } from 'zod';

/**
 * Update user profile with new photo URL after successful upload
 */
export const uploadPhoto = protectedProcedure
  .input(
    z.object({
      photoUrl: z.string().url()
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { photoUrl } = input;
    const userId = ctx.user.id;

    // TODO: Update user profile in database with new photo URL
    // For now, return success
    return {
      success: true,
      photoUrl,
      user: {
        ...ctx.user,
        image: photoUrl
      }
    };
  });
