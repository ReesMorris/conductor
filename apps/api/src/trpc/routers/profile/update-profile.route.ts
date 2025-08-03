import { prisma } from '@/libs';
import { userTransformer } from '@/transformers';
import { protectedProcedure } from '@/trpc/procedures';
import { z } from 'zod';

/**
 * Update the current user's profile with partial data
 * Only the provided fields will be updated
 */
export const updateProfile = protectedProcedure
  .input(
    z.object({
      name: z.string().min(1).max(100).optional()
    })
  )
  .mutation(async ({ ctx, input }) => {
    // Ensure at least one field is provided
    if (Object.keys(input).length === 0) {
      throw new Error('No fields to update');
    }

    // Update only the provided fields
    const updatedUser = await prisma.user.update({
      where: { id: ctx.user.id },
      data: input
    });

    // Return transformed user data
    return userTransformer.transform(updatedUser);
  });
