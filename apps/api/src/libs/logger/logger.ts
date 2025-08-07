import { env } from '@/env';
import pino from 'pino';

const isDevelopment = env.NODE_ENV === 'development';

/**
 * Logger instance configured with environment-based settings.
 *
 * - Uses `pino` for performant logging.
 * - Pretty prints logs in development mode using `pino-pretty`.
 * - Redacts sensitive fields such as `password`, `token`, `authorization`, and `cookie`.
 * - Formats log levels to uppercase.
 * - Adds ISO timestamp to each log entry.
 *
 * @see https://getpino.io/
 */
export const logger = pino({
  level: env.LOG_LEVEL,
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'HH:MM:ss.l'
        }
      }
    : undefined,
  formatters: {
    level: label => {
      return { level: label.toUpperCase() };
    }
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: ['password', 'token', 'authorization', 'cookie'],
    censor: '[REDACTED]'
  }
});

/**
 * Creates a child logger with a specified module name.
 *
 * Child loggers inherit the configuration of the main logger and
 * include the `module` property in each log entry for easier tracing.
 *
 * @param module - The name of the module or context for the child logger.
 * @returns A child logger instance scoped to the given module.
 */
export const createLogger = (module: string) => logger.child({ module });
