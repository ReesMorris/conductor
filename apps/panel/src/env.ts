import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { ThemeNames } from './providers/theme/theme.types';

/**
 * Environment variables for the panel application.
 * This configuration uses `@t3-oss/env-nextjs` to define and validate environment
 * variables at runtime.
 */
export const env = createEnv({
  server: {
    FRONTEND_URL: z.url(),
    API_URL: z.url(),
    DEFAULT_THEME: z.enum(ThemeNames).default('dark'),
    TIMEZONE: z.string().default('UTC')
  },
  runtimeEnv: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    API_URL: process.env.API_URL,
    DEFAULT_THEME: process.env.DEFAULT_THEME,
    TIMEZONE: process.env.TIMEZONE
  },
  skipValidation: process.env.NEXT_PHASE === 'phase-production-build',
  emptyStringAsUndefined: true
});
