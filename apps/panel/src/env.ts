import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { ThemeNames } from './providers';

/**
 * Environment variables for the panel application.
 * This configuration uses `@t3-oss/env-nextjs` to define and validate environment
 * variables at runtime.
 */
export const env = createEnv({
  server: {
    API_URL: z.url(),
    DEFAULT_THEME: z.enum(ThemeNames).default('dark')
  },
  runtimeEnv: {
    API_URL: process.env.API_URL,
    DEFAULT_THEME: process.env.DEFAULT_THEME
  }
});
