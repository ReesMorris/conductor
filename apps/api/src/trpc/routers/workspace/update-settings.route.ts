import { prisma } from '@/libs';
import { z } from 'zod';
import { adminProcedure } from '../../procedures';

const updateSettingsSchema = z.object({
  registrationEnabled: z.boolean().optional()
});

export const updateSettings = adminProcedure
  .input(updateSettingsSchema)
  .mutation(async ({ input }) => {
    // Update or create the workspace settings
    const settings = await prisma.workspaceSettings.upsert({
      where: { id: 'workspace_settings' },
      update: {
        ...(input.registrationEnabled !== undefined && {
          registrationEnabled: input.registrationEnabled
        })
      },
      create: {
        id: 'workspace_settings',
        registrationEnabled: input.registrationEnabled ?? true
      }
    });

    return {
      registrationEnabled: settings.registrationEnabled
    };
  });
