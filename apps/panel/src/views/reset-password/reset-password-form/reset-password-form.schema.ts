import { z } from 'zod';

interface SchemaMessages {
  passwordRequired: string;
}

/**
 * Schema for reset password form validation
 */
export const resetPasswordFormSchema = (messages: SchemaMessages) =>
  z.object({
    newPassword: z.string().min(1, messages.passwordRequired)
  });

/**
 * Reset password form data type
 */
export type ResetPasswordFormData = z.infer<
  ReturnType<typeof resetPasswordFormSchema>
>;
