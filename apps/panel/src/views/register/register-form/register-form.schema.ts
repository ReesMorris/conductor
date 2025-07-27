import { z } from 'zod';

/**
 * Schema for registration form validation
 */
export const registerFormSchema = z.object({
  name: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

/**
 * Registration form data type
 */
export type RegisterFormData = z.infer<typeof registerFormSchema>;
