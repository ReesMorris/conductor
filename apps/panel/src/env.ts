import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Environment variables for the panel application.
 * This configuration uses `@t3-oss/env-nextjs` to define and validate environment
 * variables at runtime.
 */
export const env = createEnv({
  server: {
    API_URL: z.url()
  },
  runtimeEnv: {
    API_URL: process.env.API_URL
  }
});
