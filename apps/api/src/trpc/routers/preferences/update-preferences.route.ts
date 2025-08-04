import { prisma } from '@/libs';
import { userTransformer } from '@/transformers';
import { protectedProcedure } from '@/trpc/procedures';
import { z } from 'zod';

/**
 * Update the current user's preferences with partial data
 * Only the provided fields will be updated
 */
export const updatePreferences = protectedProcedure
  .input(
    z.object({
      timeZone: z.string().optional()
    })
  )
  .mutation(async ({ ctx, input }) => {
    // Ensure at least one field is provided
    if (Object.keys(input).length === 0) {
      throw new Error('No preferences to update');
    }

    // Validate timezone if provided
    if (input.timeZone) {
      try {
        // Test if the timezone is valid by trying to use it
        Intl.DateTimeFormat(undefined, { timeZone: input.timeZone });
      } catch {
        throw new Error('Invalid timezone identifier');
      }
    }

    // Update only the provided fields
    const updatedUser = await prisma.user.update({
      where: { id: ctx.user.id },
      data: input
    });

    // Return transformed user data
    return userTransformer.transform(updatedUser);
  });
