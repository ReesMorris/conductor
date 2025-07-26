import { app } from './app';
import { env } from './env';
import { disconnectDatabase, logger } from './libs';

const log = logger.child({ module: 'server' });

log.info(`Server starting on port ${env.PORT} in ${env.NODE_ENV} mode`);

// Graceful shutdown handlers
process.on('SIGINT', async () => {
  log.info('SIGINT received, shutting down gracefully…');
  await disconnectDatabase();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  log.info('SIGTERM received, shutting down gracefully…');
  await disconnectDatabase();
  process.exit(0);
});

export default {
  port: env.PORT,
  fetch: app.fetch
};
