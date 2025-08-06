import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    // Environment
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development')
      .describe('The environment the app is running in'),

    // Server
    PORT: z.coerce
      .number()
      .default(4000)
      .describe('The port the server will listen on'),

    // Database
    DATABASE_URL: z.url().describe('Database connection URL'),

    // Security
    ENCRYPTION_KEY: z
      .string()
      .min(64)
      .describe('Key used for encrypting sensitive data'),

    // Logging
    LOG_LEVEL: z
      .enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
      .default('info')
      .describe('The logging level for the application'),
    LOG_REQUESTS: z
      .string()
      .transform(v => v === 'true')
      .default(false)
      .describe('Enable or disable request logging'),

    // Railway
    RAILWAY_API_URL: z.url().describe("Railway's GraphQL API URL"),
    RAILWAY_ENVIRONMENT_ID: z.string().describe('Railway environment ID'),
    RAILWAY_PROJECT_ID: z.string().describe('Railway project ID'),

    // Authentication
    BETTER_AUTH_URL: z.url().describe('Base URL for Better Auth'),
    BETTER_AUTH_SECRET: z
      .string()
      .min(32)
      .describe('Secret key for signing Better Auth tokens'),
    FRONTEND_URL: z.url().describe('Frontend URL for CORS configuration'),

    // S3-compatible storage (MinIO in dev, any S3 provider in production)
    S3_ENDPOINT: z.url().describe('S3-compatible storage endpoint'),
    S3_ACCESS_KEY_ID: z.string().describe('S3 access key ID'),
    S3_SECRET_ACCESS_KEY: z.string().describe('S3 secret access key'),
    S3_BUCKET_NAME: z.string().describe('S3 bucket name for uploads'),
    S3_REGION: z.string().default('us-east-1').describe('S3 region'),
    S3_USE_SSL: z
      .string()
      .transform(v => v === 'true')
      .default(false)
      .describe('Use SSL for S3 connections'),
    S3_FORCE_PATH_STYLE: z
      .string()
      .transform(v => v === 'true')
      .default(false)
      .describe('Force path-style URLs (required for MinIO)')
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true
});
