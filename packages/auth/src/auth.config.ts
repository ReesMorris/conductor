import { z } from 'zod';

/**
 * Auth configuration schema
 */
export const authConfigSchema = z.object({
  betterAuthUrl: z.url(),
  betterAuthSecret: z.string().min(32),
  frontendUrl: z.url()
});

/**
 * Auth client configuration schema
 */
export const authClientConfigSchema = z.object({
  baseURL: z.url()
});
