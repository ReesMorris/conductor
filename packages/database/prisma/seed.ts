import { PrismaClient } from '../generated/client';
import { games } from '../src/seeds';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Starting database seed...');

  console.log('🎮 Seeding games...');
  for (const game of games) {
    await prisma.game.upsert({
      where: { id: game.id },
      update: game,
      create: game
    });
    console.log(`  ✅ ${game.displayName}`);
  }

  console.log('✨ Database seeded successfully!');
}

seed()
  .catch(error => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
