import { z } from 'zod';

interface SchemaMessages {
  emailRequired: string;
  invalidEmail: string;
  passwordRequired: string;
}

/**
 * Schema for login form validation
 */
export const loginFormSchema = (messages: SchemaMessages) =>
  z.object({
    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.invalidEmail),
    password: z.string().min(1, messages.passwordRequired)
  });

/**
 * Login form data type
 */
export type LoginFormData = z.infer<ReturnType<typeof loginFormSchema>>;
