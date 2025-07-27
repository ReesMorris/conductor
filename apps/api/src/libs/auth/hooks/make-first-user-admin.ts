import type { User } from 'better-auth';
import { prisma } from '../../db';

/**
 * Automatically assigns admin role to the first user in the system
 *
 * This hook runs before user creation and checks if any users exist in the database.
 * If no users exist, the new user is assigned the 'admin' role.
 * All subsequent users receive the default 'user' role.
 *
 * @param user - The user object being created
 * @returns Modified user data with the appropriate role assigned
 */
export const makeFirstUserAdmin = async (user: User) => {
  // Check if this is the first user
  const userCount = await prisma.user.count();

  // If no users exist, make this user an admin
  const role = userCount === 0 ? 'admin' : 'user';

  return {
    data: {
      ...user,
      role
    }
  };
};
