import { s3Service } from '@/libs/s3';
import { protectedProcedure } from '@/trpc/procedures';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

/**
 * Get a presigned URL for uploading a profile photo to MinIO/S3
 */
export const getPresignedUrl = protectedProcedure
  .input(
    z.object({
      fileName: z.string().min(1),
      fileType: z.string().min(1),
      fileSize: z
        .number()
        .positive()
        .max(2 * 1024 * 1024) // 2MB max
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { fileName, fileType, fileSize } = input;
    const userId = ctx.user.id;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(fileType)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid file type. Only JPEG, PNG, and GIF are allowed.'
      });
    }

    try {
      // Generate a secure UUID-based key for the user's profile photo
      const key = s3Service.generateKey({
        prefix: `users/${userId}/profile`,
        filename: fileName
      });

      // Get presigned URL
      const uploadUrl = await s3Service.getPresignedUploadUrl({
        key,
        contentType: fileType,
        contentLength: fileSize
      });

      // Get the final URL where the file will be accessible
      const fileUrl = s3Service.getFileUrl(key);

      return {
        uploadUrl,
        fileUrl,
        key // Return the key for verification later
      };
    } catch {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to generate upload URL'
      });
    }
  });
