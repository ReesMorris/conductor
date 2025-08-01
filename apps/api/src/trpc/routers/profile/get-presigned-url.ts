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

    // TODO: Implement MinIO presigned URL generation
    // For now, return a placeholder
    return {
      uploadUrl: 'https://example.com/upload',
      fileUrl: `https://example.com/profiles/${userId}/photo.jpg`
    };
  });
