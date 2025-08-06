import z from 'zod';

interface SchemaMessages {
  nameRequired: string;
  emailRequired: string;
  invalidEmail: string;
  passwordRequired: string;
}

/**
 * Schema for user setup form validation
 */
export const userSetupSchema = (messages: SchemaMessages) =>
  z.object({
    name: z.string().min(1, messages.nameRequired),
    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.invalidEmail),
    password: z.string().min(1, messages.passwordRequired)
  });

/**
 * User setup form data type
 */
export type UserSetupFormData = z.infer<ReturnType<typeof userSetupSchema>>;
