import { z } from 'zod';

interface SchemaMessages {
  nameRequired: string;
  emailRequired: string;
  invalidEmail: string;
  passwordRequired: string;
}

/**
 * Schema for registration form validation
 */
export const registerFormSchema = (messages: SchemaMessages) =>
  z.object({
    name: z.string().min(1, messages.nameRequired),
    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.invalidEmail),
    password: z.string().min(1, messages.passwordRequired)
  });

/**
 * Registration form data type
 */
export type RegisterFormData = z.infer<ReturnType<typeof registerFormSchema>>;
