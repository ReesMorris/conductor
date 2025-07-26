import { prisma } from '@conductor/database';
import { createLogger } from '../logger';

const log = createLogger('database');

/**
 * Checks the connection to the database by executing a simple query.
 *
 * @returns A promise that resolves to `true` if the database connection is successful,
 * or `false` if the connection fails.
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    log.error(error, 'Database connection failed');
    return false;
  }
}
