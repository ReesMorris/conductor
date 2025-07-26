import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development')
      .describe('The environment the app is running in'),
    PORT: z.coerce
      .number()
      .default(4000)
      .describe('The port the server will listen on'),
    LOG_LEVEL: z
      .enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
      .default('info')
      .describe('The logging level for the application'),
    LOG_REQUESTS: z
      .string()
      .transform(v => v === 'true')
      .default(false)
      .describe('Enable or disable request logging'),
    DATABASE_URL: z.url().describe('Database connection URL'),
    BETTER_AUTH_SECRET: z
      .string()
      .min(32)
      .describe('Secret key for signing Better Auth tokens'),
    BETTER_AUTH_URL: z.url().describe('Base URL for Better Auth'),
    FRONTEND_URL: z.url().describe('Frontend URL for CORS configuration')
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true
});
