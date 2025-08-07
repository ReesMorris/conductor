import type { Prisma } from '../../generated/client';

export const games: Prisma.GameCreateInput[] = [
  {
    id: 'minecraft',
    displayName: 'Minecraft',
    defaultPort: 25565,
    protocol: 'TCP',
    railwayTemplateId: 'aebe100e-0335-45a7-bcc0-d60f916653b1'
  }
];
