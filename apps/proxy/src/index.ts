import { ProxyRouter } from './router';

const router = new ProxyRouter();

async function main() {
  console.log('Starting Conductor Proxy Service...');

  try {
    await router.start();
    console.log('Proxy service is running');
  } catch (error) {
    console.error('Failed to start proxy service:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  await router.stop();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
  await router.stop();
  process.exit(0);
});

// Handle uncaught errors
process.on('uncaughtException', error => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the service
main().catch(console.error);
