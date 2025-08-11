import { prisma } from '@/libs';
import { publicProcedure } from '../../procedures';

export const getSettings = publicProcedure.query(async () => {
  // Get or create the workspace settings
  let settings = await prisma.workspaceSettings.findUnique({
    where: { id: 'workspace_settings' }
  });

  // If settings don't exist, create default settings
  if (!settings) {
    settings = await prisma.workspaceSettings.create({
      data: {
        id: 'workspace_settings',
        registrationEnabled: false
      }
    });
  }

  // Check if there are any users - if not, always allow registration for the first admin
  const userCount = await prisma.user.count();
  const effectiveRegistrationEnabled =
    userCount === 0 ? true : settings.registrationEnabled;

  return {
    registrationEnabled: effectiveRegistrationEnabled
  };
});
