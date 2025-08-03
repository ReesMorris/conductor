import { z } from 'zod';

/**
 * Auth configuration schema
 */
export const authConfigSchema = z.object({
  betterAuthUrl: z.url(),
  betterAuthSecret: z.string().min(32),
  frontendUrl: z.url()
});
