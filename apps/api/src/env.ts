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
      .describe('Enable or disable request logging')
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true
});
