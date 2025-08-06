#!/usr/bin/env tsx

import { PrismaClient } from '@conductor/database';

const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding database with test data...');

  // Create Minecraft game definition
  const minecraftGame = await prisma.game.upsert({
    where: { id: 'minecraft-java-test' },
    update: {},
    create: {
      id: 'minecraft-java-test',
      displayName: 'Minecraft: Java Edition',
      defaultPort: 25565,
      protocol: 'TCP'
    }
  });
  console.log('Created game:', minecraftGame.displayName);

  // Create a test Minecraft server
  const testServer = await prisma.gameServer.upsert({
    where: { proxyPort: 25565 },
    update: {
      targetHost: 'localhost', // For local testing
      enabled: true
    },
    create: {
      name: 'Test Minecraft Server',
      gameId: minecraftGame.id,
      proxyPort: 25565,
      targetHost: 'localhost', // Will forward to localhost:25565
      enabled: true
    }
  });
  console.log('Created game server:', testServer.name);

  // Create Echo server for testing
  const echoGame = await prisma.game.upsert({
    where: { id: 'echo-test' },
    update: {},
    create: {
      id: 'echo-test',
      displayName: 'Echo Server',
      defaultPort: 8080,
      protocol: 'TCP'
    }
  });
  console.log('Created game:', echoGame.displayName);

  const echoServer = await prisma.gameServer.upsert({
    where: { proxyPort: 9999 },
    update: {
      targetHost: 'localhost',
      enabled: true
    },
    create: {
      name: 'Test Echo Server',
      gameId: echoGame.id,
      proxyPort: 9999,
      targetHost: 'localhost',
      enabled: true
    }
  });
  console.log('Created game server:', echoServer.name);

  console.log('\nTest data seeded successfully!');
  console.log('\nYou can now:');
  console.log('1. Run the echo server: yarn dev:echo');
  console.log('2. Run the proxy: yarn dev');
  console.log(
    '3. Connect to localhost:9999 to test the echo server through the proxy'
  );
  console.log(
    '4. If you have Minecraft running locally, connect to localhost:25565'
  );
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
