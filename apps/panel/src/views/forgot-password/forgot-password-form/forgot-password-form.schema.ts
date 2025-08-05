import { z } from 'zod';

interface SchemaMessages {
  invalid: string;
}

export const forgotPasswordFormSchema = (messages: SchemaMessages) =>
  z.object({
    email: z.email(messages.invalid)
  });

export type ForgotPasswordFormData = z.infer<
  ReturnType<typeof forgotPasswordFormSchema>
>;
