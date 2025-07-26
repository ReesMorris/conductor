import { prisma } from '@conductor/database';

/**
 * Disconnects from the Prisma database.
 *
 * This function asynchronously closes the connection to the database
 * using Prisma's `$disconnect` method. It should be called when the
 * application is shutting down or when database access is no longer needed.
 *
 * @returns A promise that resolves when the disconnection is complete.
 */
export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
}
