import { env } from '@/env';
import pino from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';
const isServer = typeof window === 'undefined';

/**
 * Creates appropriate logger based on environment (server vs browser)
 */
const createBaseLogger = () => {
  if (isServer) {
    // Server-side logger with full Pino features
    return pino({
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
        paths: [
          'password',
          'token',
          'authorization',
          'cookie',
          'api_key',
          'secret'
        ],
        censor: '[REDACTED]'
      }
    });
  } else {
    // Browser-safe logger
    return pino({
      browser: {
        serialize: true,
        asObject: isDevelopment,
        transmit: {
          level: 'error',
          send: (level, logEvent) => {
            // In production, you could send errors to a logging service
            // For now, just use console in development
            if (isDevelopment) {
              const msg = logEvent.messages[0];
              if (level === 'error') {
                console.error(msg);
              } else if (level === 'warn') {
                console.warn(msg);
              } else {
                console.log(msg);
              }
            }
          }
        }
      },
      level: 'warn' // Default to warn in browser
    });
  }
};

export const logger = createBaseLogger();

/**
 * Creates a child logger with a specified module name.
 *
 * @example
 * ```ts
 * const log = createLogger('auth-middleware');
 * log.info('User authenticated successfully');
 * log.error({ err }, 'Authentication failed');
 * ```
 */
export const createLogger = (module: string) => logger.child({ module });
