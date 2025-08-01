import { prisma } from '@/libs/db';
import { s3Service } from '@/libs/s3';
import { protectedProcedure } from '@/trpc/procedures';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

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

      // Get the public URL for the uploaded file
      const fileUrl = s3Service.getFileUrl(key);

      // Update user profile using Prisma
      const updatedUser = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          image: fileUrl
        }
      });

      if (!updatedUser) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update user profile'
        });
      }

      // TODO: Delete old profile photo if it exists

      return {
        success: true,
        user: updatedUser
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
