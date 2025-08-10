import { connect, createServer, type Server, type Socket } from 'node:net';
import type {
  Game,
  GameServer,
  GameServerConnection
} from '@conductor/database';
import { PrismaClient } from '@conductor/database';

type GameServerWithConnections = GameServer & {
  game: Game;
  connections: GameServerConnection[];
};

export class ProxyRouter {
  private prisma: PrismaClient;
  private servers: Map<number, Server> = new Map();
  private activeConnections: Map<string, Set<Socket>> = new Map();
  private portToConnectionKey: Map<number, string> = new Map();

  constructor() {
    this.prisma = new PrismaClient();
  }

  async start() {
    console.log('[ProxyRouter] Starting...');

    // Connect to database
    await this.prisma.$connect();
    console.log('[ProxyRouter] Connected to database');

    // Load and start proxy servers
    await this.loadGameServers();

    // Watch for changes (in production, you might use a different mechanism)
    setInterval(() => this.reloadGameServers(), 30000); // Check every 30 seconds
  }

  async stop() {
    console.log('[ProxyRouter] Stopping...');

    // Close all proxy servers
    for (const [port] of this.servers) {
      await this.stopProxyServer(port);
    }

    // Disconnect from database
    await this.prisma.$disconnect();
    console.log('[ProxyRouter] Stopped');
  }

  private async loadGameServers() {
    const gameServers = await this.prisma.gameServer.findMany({
      where: { enabled: true },
      include: {
        game: true,
        connections: {
          where: { enabled: true }
        }
      }
    });

    console.log(
      `[ProxyRouter] Found ${gameServers.length} enabled game servers`
    );

    // Start proxy for each connection
    for (const gameServer of gameServers) {
      for (const connection of gameServer.connections) {
        await this.startProxyForConnection(gameServer, connection);
      }
    }
  }

  private async reloadGameServers() {
    const gameServers = await this.prisma.gameServer.findMany({
      where: { enabled: true },
      include: {
        game: true,
        connections: {
          where: { enabled: true }
        }
      }
    });

    const currentPorts = new Set(this.servers.keys());
    const desiredPorts = new Set<number>();

    // Collect all desired ports
    for (const gameServer of gameServers) {
      for (const connection of gameServer.connections) {
        desiredPorts.add(connection.proxyPort);
      }
    }

    // Stop servers that are no longer needed
    for (const port of currentPorts) {
      if (!desiredPorts.has(port)) {
        console.log(
          `[ProxyRouter] Stopping proxy on port ${port} (no longer configured)`
        );
        await this.stopProxyServer(port);
      }
    }

    // Start new servers
    for (const gameServer of gameServers) {
      for (const connection of gameServer.connections) {
        if (!currentPorts.has(connection.proxyPort)) {
          await this.startProxyForConnection(gameServer, connection);
        }
      }
    }
  }

  private async startProxyForConnection(
    gameServer: GameServerWithConnections,
    connection: GameServerConnection
  ) {
    const { proxyPort, domain } = connection;
    const { name, game, railwayUrl } = gameServer;
    const targetPort = game.defaultPort;

    // Determine target host based on connection type
    const targetHost = domain || railwayUrl || 'localhost';

    if (this.servers.has(proxyPort)) {
      console.log(`[ProxyRouter] Proxy already running on port ${proxyPort}`);
      return;
    }

    console.log(
      `[ProxyRouter] Starting proxy for "${name}" (${game.displayName})`
    );
    console.log(`[ProxyRouter]   Connection: ${connection.name || 'default'}`);
    console.log(`[ProxyRouter]   Proxy Port: ${proxyPort}`);
    console.log(`[ProxyRouter]   Target: ${targetHost}:${targetPort}`);
    console.log(`[ProxyRouter]   Protocol: ${game.protocol}`);

    const server = createServer(clientSocket => {
      const clientAddress = `${clientSocket.remoteAddress}:${clientSocket.remotePort}`;
      console.log(
        `[${new Date().toISOString()}] [${name}] New connection from ${clientAddress}`
      );

      // Track connection
      const connectionKey = `${gameServer.id}:${connection.id}`;
      if (!this.activeConnections.has(connectionKey)) {
        this.activeConnections.set(connectionKey, new Set());
      }
      const connectionSet = this.activeConnections.get(connectionKey);
      if (connectionSet) {
        connectionSet.add(clientSocket);
      }

      // Connect to target server
      const targetSocket = connect(targetPort, targetHost, () => {
        console.log(
          `[${new Date().toISOString()}] [${name}] Connected to ${targetHost}:${targetPort}`
        );
      });

      // Pipe data between client and target
      clientSocket.pipe(targetSocket);
      targetSocket.pipe(clientSocket);

      // Handle disconnections
      const cleanup = () => {
        this.activeConnections.get(connectionKey)?.delete(clientSocket);
        clientSocket.destroy();
        targetSocket.destroy();
      };

      clientSocket.on('end', () => {
        console.log(
          `[${new Date().toISOString()}] [${name}] Client ${clientAddress} disconnected`
        );
        cleanup();
      });

      targetSocket.on('end', () => {
        console.log(
          `[${new Date().toISOString()}] [${name}] Target disconnected for ${clientAddress}`
        );
        cleanup();
      });

      clientSocket.on('error', err => {
        console.error(
          `[${new Date().toISOString()}] [${name}] Client error:`,
          err.message
        );
        cleanup();
      });

      targetSocket.on('error', err => {
        console.error(
          `[${new Date().toISOString()}] [${name}] Target error:`,
          err.message
        );
        cleanup();
      });
    });

    // Start listening
    await new Promise<void>((resolve, reject) => {
      server.listen(proxyPort, '0.0.0.0', () => {
        console.log(
          `[ProxyRouter] Proxy listening on port ${proxyPort} for "${name}"`
        );
        resolve();
      });

      server.once('error', reject);
    });

    server.on('error', err => {
      console.error(`[ProxyRouter] Server error on port ${proxyPort}:`, err);
    });

    this.servers.set(proxyPort, server);
    // Track which connection key is associated with this port
    this.portToConnectionKey.set(
      proxyPort,
      `${gameServer.id}:${connection.id}`
    );
  }

  private async stopProxyServer(port: number) {
    const server = this.servers.get(port);
    if (!server) {
      return;
    }

    // Close the server
    await new Promise<void>(resolve => {
      server.close(() => {
        console.log(`[ProxyRouter] Stopped proxy on port ${port}`);
        resolve();
      });
    });

    this.servers.delete(port);
    this.portToConnectionKey.delete(port);
  }

  getActiveConnections(gameServerId: string, connectionId?: string): number {
    const key = connectionId ? `${gameServerId}:${connectionId}` : gameServerId;

    // If looking for specific connection
    if (connectionId) {
      return this.activeConnections.get(key)?.size || 0;
    }

    // Count all connections for the game server
    let total = 0;
    for (const [connKey, sockets] of this.activeConnections) {
      if (connKey.startsWith(gameServerId)) {
        total += sockets.size;
      }
    }
    return total;
  }

  getAllActiveConnections(): Map<string, number> {
    const result = new Map<string, number>();
    for (const [id, sockets] of this.activeConnections) {
      result.set(id, sockets.size);
    }
    return result;
  }

  getConnectionsByPort(): Map<number, number> {
    const result = new Map<number, number>();

    // Count connections for each port using the mapping
    for (const [port, connectionKey] of this.portToConnectionKey) {
      const sockets = this.activeConnections.get(connectionKey);
      result.set(port, sockets?.size || 0);
    }

    return result;
  }
}
