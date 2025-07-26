import { z } from 'zod';

/**
 * Schema for login form validation
 */
export const loginFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

/**
 * Login form data type
 */
export type LoginFormData = z.infer<typeof loginFormSchema>;
