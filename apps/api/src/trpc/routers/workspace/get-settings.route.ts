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
        registrationEnabled: true
      }
    });
  }

  return {
    registrationEnabled: settings.registrationEnabled
  };
});
