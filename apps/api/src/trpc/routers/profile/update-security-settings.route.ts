import { auth, prisma } from '@/libs';
import { userTransformer } from '@/transformers';
import { protectedProcedure } from '@/trpc/procedures';
import { z } from 'zod';

/**
 * Update the current user's security settings with partial data
 * Only the provided fields will be updated
 */
export const updateSecuritySettings = protectedProcedure
  .input(
    z.object({
      email: z.string().email('Invalid email address').optional()
    })
  )
  .mutation(async ({ ctx, input }) => {
    // Ensure at least one field is provided
    if (Object.keys(input).length === 0) {
      throw new Error('No fields to update');
    }

    // Handle email update separately if provided
    if (input.email) {
      await auth.api.changeEmail({
        body: { newEmail: input.email },
        headers: { token: ctx.session.token }
      });
      // Check if email is already taken by another user
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email }
      });

      if (existingUser && existingUser.id !== ctx.user.id) {
        throw new Error('Email address is already in use');
      }
    }

    // Prepare update data
    interface UpdateData {
      email?: string;
      emailVerified?: boolean;
    }

    const updateData: UpdateData = {};

    if (input.email) {
      updateData.email = input.email;
      updateData.emailVerified = false; // Reset email verification when email changes
      // Note: Better Auth's changeEmail handles verification email
    }

    // Future fields would be handled here
    // if (input.twoFactorEnabled !== undefined) {
    //   updateData.twoFactorEnabled = input.twoFactorEnabled;
    // }

    // Update the user with only the provided fields
    const updatedUser = await prisma.user.update({
      where: { id: ctx.user.id },
      data: updateData
    });

    // Return transformed user data
    return userTransformer.transform(updatedUser);
  });
