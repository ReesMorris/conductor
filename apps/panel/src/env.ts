import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { THEME_NAMES } from './constants';

/**
 * Environment variables for the panel application.
 * This configuration uses `@t3-oss/env-nextjs` to define and validate environment
 * variables at runtime.
 *
 * Because this will be containerised, we skip validation during production builds
 * to avoid issues with missing environment variables that are expected to be set
 * in the container environment.
 */
export const env = createEnv({
  server: {
    // URLs
    FRONTEND_URL: z.url().default('http://localhost:8080/api'), // defaults are needed to prevent build errors
    API_URL: z.url().default('http://localhost:8080'),

    // Theming
    DEFAULT_THEME: z.enum(THEME_NAMES).default('dark'),

    // Internationalization
    TIMEZONE: z.string().default('Europe/London'),

    // Logging
    LOG_LEVEL: z
      .enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
      .default('info')
      .describe('The logging level for the application')
  },
  runtimeEnv: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    API_URL: process.env.API_URL,
    DEFAULT_THEME: process.env.DEFAULT_THEME,
    TIMEZONE: process.env.TIMEZONE,
    LOG_LEVEL: process.env.LOG_LEVEL
  },
  emptyStringAsUndefined: true
});
