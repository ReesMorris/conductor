import { app } from './app';
import { env } from './env';
import { disconnectDatabase } from './libs';

console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);

// Graceful shutdown handlers
process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  await disconnectDatabase();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await disconnectDatabase();
  process.exit(0);
});

export default {
  port: env.PORT,
  fetch: app.fetch
};
