import { connect, createServer } from 'node:net';
import { env } from './env';

// Use type-safe environment configuration
const PROXY_PORT = env.PROXY_PORT;
const PROXY_HOST = env.PROXY_HOST;
const TARGET_HOST = env.TARGET_HOST;
const TARGET_PORT = env.TARGET_PORT;

console.log('Starting TCP Proxy...');
console.log('Configuration:');
console.log(`  Proxy: ${PROXY_HOST}:${PROXY_PORT}`);
console.log(`  Target: ${TARGET_HOST}:${TARGET_PORT}`);

// Create the proxy server
const server = createServer(clientSocket => {
  const clientAddress = `${clientSocket.remoteAddress}:${clientSocket.remotePort}`;
  console.log(
    `[${new Date().toISOString()}] New connection from ${clientAddress}`
  );

  // Connect to the target server
  const targetSocket = connect(TARGET_PORT, TARGET_HOST, () => {
    console.log(
      `[${new Date().toISOString()}] Connected to target ${TARGET_HOST}:${TARGET_PORT}`
    );
  });

  // Pipe data between client and target
  clientSocket.pipe(targetSocket);
  targetSocket.pipe(clientSocket);

  // Handle client disconnect
  clientSocket.on('end', () => {
    console.log(
      `[${new Date().toISOString()}] Client ${clientAddress} disconnected`
    );
    targetSocket.end();
  });

  // Handle target disconnect
  targetSocket.on('end', () => {
    console.log(
      `[${new Date().toISOString()}] Target disconnected for client ${clientAddress}`
    );
    clientSocket.end();
  });

  // Handle errors
  clientSocket.on('error', err => {
    console.error(
      `[${new Date().toISOString()}] Client error for ${clientAddress}:`,
      err.message
    );
    targetSocket.destroy();
  });

  targetSocket.on('error', err => {
    console.error(
      `[${new Date().toISOString()}] Target error for ${clientAddress}:`,
      err.message
    );
    clientSocket.destroy();
  });
});

// Start listening
server.listen(PROXY_PORT, PROXY_HOST, () => {
  console.log(
    `[${new Date().toISOString()}] TCP Proxy listening on ${PROXY_HOST}:${PROXY_PORT}`
  );
  console.log(
    `[${new Date().toISOString()}] Forwarding all connections to ${TARGET_HOST}:${TARGET_PORT}`
  );
});

// Handle server errors
server.on('error', err => {
  console.error('Proxy server error:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('Proxy server closed');
    process.exit(0);
  });
});
