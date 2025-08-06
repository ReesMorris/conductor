import { PrismaClient } from '../generated/client';

/**
 * A global object used to store a singleton instance of `PrismaClient` on the global scope.
 * This helps to prevent multiple instances of PrismaClient from being created during development,
 * especially with hot-reloading in server environments.
 *
 * @remarks
 * The object is cast to an extended type of `globalThis` to include an optional `prisma` property.
 *
 * @property prisma - An optional instance of `PrismaClient` used for database access.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * A singleton instance of `PrismaClient` that is reused across the application.
 * In production, a new instance is created only once, while in development,
 * it uses the global instance to avoid multiple connections.
 *
 * @remarks
 * This ensures that the Prisma Client is not re-instantiated on every file change during development,
 * which can lead to issues with database connections.
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// If the environment is not production, assign the Prisma client to the global object
// to maintain a single instance across the application.
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
