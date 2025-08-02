import { createLogger } from '@/libs';
import { prisma } from '@/libs/db';
import { s3Service } from '@/libs/s3';
import { protectedProcedure } from '@/trpc/procedures';
import { transformS3Url } from '@/utils';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

const log = createLogger('profile:upload-photo');

/**
 * Confirm photo upload and update user profile after successful S3 upload
 */
export const uploadPhoto = protectedProcedure
  .input(
    z.object({
      key: z.string().min(1)
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { key } = input;
    const userId = ctx.user.id;

    try {
      // Verify the key belongs to this user
      if (!key.startsWith(`users/${userId}/profile/`)) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Invalid upload key'
        });
      }

      // Verify the file exists in S3
      const fileExists = await s3Service.fileExists(key);
      if (!fileExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Upload not found. Please try uploading again.'
        });
      }

      // Store the old image key before updating
      const oldImageKey = ctx.user.image;

      // Update user profile using Prisma - store only the S3 key
      const updatedUser = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          image: key
        }
      });

      if (!updatedUser) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update user profile'
        });
      }

      // Delete old profile photo if it exists
      if (oldImageKey && oldImageKey !== key) {
        try {
          await s3Service.deleteFile(oldImageKey);
        } catch (error) {
          // Log the error but don't fail the upload
          log.error(error, 'Failed to delete old profile photo');
        }
      }

      // Transform the S3 key to a full URL before returning
      return {
        success: true,
        user: {
          ...updatedUser,
          image: transformS3Url(updatedUser.image)
        }
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to confirm upload'
      });
    }
  });
