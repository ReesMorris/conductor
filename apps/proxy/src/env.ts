import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    // Proxy configuration
    PROXY_PORT: z.coerce.number().int().min(1).max(65535).default(9999),
    PROXY_HOST: z.string().default('0.0.0.0'),

    // Target configuration (temporary - will be database-driven later)
    TARGET_HOST: z.string().default('echo-server.railway.internal'),
    TARGET_PORT: z.coerce.number().int().min(1).max(65535).default(8080),

    // Railway environment
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    RAILWAY_ENVIRONMENT: z.string().optional(),

    // Database connection for routing configuration
    DATABASE_URL: z.url(),

    // Monitoring & Logging
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    ENABLE_METRICS: z.coerce.boolean().default(false),
    METRICS_PORT: z.coerce.number().int().min(1).max(65535).default(9090)
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true
});
