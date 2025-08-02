import { createLogger } from '@/libs';
import { prisma } from '@/libs/db';
import { s3Service } from '@/libs/s3';
import { protectedProcedure } from '@/trpc/procedures';
import { TRPCError } from '@trpc/server';

const log = createLogger('profile:remove-photo');

/**
 * Remove user's profile photo by deleting it from S3 and clearing the database field
 */
export const removePhoto = protectedProcedure.mutation(async ({ ctx }) => {
  const userId = ctx.user.id;
  const oldImageKey = ctx.user.image;

  try {
    // Update user profile to remove image
    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        image: null
      }
    });

    if (!updatedUser) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to update user profile'
      });
    }

    // Delete the old profile photo from S3 if it exists
    if (oldImageKey) {
      try {
        await s3Service.deleteFile(oldImageKey);
      } catch (error) {
        // Log the error but don't fail the operation
        log.error(error, 'Failed to delete old profile photo');
      }
    }

    // Return the updated user with null image
    return {
      success: true,
      user: {
        ...updatedUser,
        image: null
      }
    };
  } catch (error) {
    if (error instanceof TRPCError) {
      throw error;
    }

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to remove profile photo'
    });
  }
});
