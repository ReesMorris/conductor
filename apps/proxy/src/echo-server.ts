import { createServer } from 'node:net';

const PORT = 8080;

const server = createServer(socket => {
  console.log(
    `[${new Date().toISOString()}] Client connected from ${socket.remoteAddress}:${socket.remotePort}`
  );

  socket.write('Welcome to the Echo Server!\n');

  socket.on('data', data => {
    console.log(
      `[${new Date().toISOString()}] Received: ${data.toString().trim()}`
    );
    socket.write(`Echo: ${data}`);
  });

  socket.on('end', () => {
    console.log(`[${new Date().toISOString()}] Client disconnected`);
  });

  socket.on('error', err => {
    console.error(`[${new Date().toISOString()}] Socket error:`, err.message);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(
    `[${new Date().toISOString()}] Echo server listening on port ${PORT}`
  );
});

server.on('error', err => {
  console.error('Server error:', err);
  process.exit(1);
});
