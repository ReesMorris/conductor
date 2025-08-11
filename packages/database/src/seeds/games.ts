import type { Prisma } from '../../generated/client';

export const games: Prisma.GameCreateInput[] = [
  {
    id: 'minecraft',
    displayName: 'Minecraft',
    defaultPort: 25565,
    protocol: 'TCP',
    railwayTemplateId: '560dfff4-c332-47aa-b403-1d7f58b6d844', // conductor/minecraft template UUID
    railwayTemplateCode: 'Ylo10j' // conductor/minecraft template code
  }
];
