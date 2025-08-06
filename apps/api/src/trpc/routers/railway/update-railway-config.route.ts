import { prisma } from '@/libs';
import { createRailwayService } from '@/services/railway';
import { railwayTransformer } from '@/transformers/railway';
import { adminProcedure } from '@/trpc/procedures';
import { encrypt } from '@/utils/encryption';
import { z } from 'zod';

/**
 * Update or create the Railway configuration
 * Uses singleton pattern with id='railway_config'
 */
export const updateRailwayConfig = adminProcedure
  .input(
    z.object({
      projectToken: z.uuidv4().optional()
    })
  )
  .mutation(async ({ input }) => {
    // Ensure at least one field is provided
    if (Object.keys(input).length === 0) {
      throw new Error('No fields to update');
    }

    // If a new token is provided, validate it with Railway API
    let projectId: string | undefined;
    if (input.projectToken) {
      try {
        const railwayService = createRailwayService(input.projectToken);
        const validationResult = await railwayService.validateToken();
        projectId = validationResult.projectToken.projectId;
      } catch {
        throw new Error(
          'Invalid Railway token. Please check your token and try again.'
        );
      }
    }

    // Prepare data with encryption
    const dataToSave = {
      ...(input.projectToken && {
        projectToken: encrypt(input.projectToken),
        projectId
      })
    };

    // Upsert the Railway configuration
    const railwayConfig = await prisma.railway.upsert({
      where: {
        id: 'railway_config'
      },
      create: {
        id: 'railway_config',
        projectToken: '',
        ...dataToSave
      },
      update: dataToSave
    });

    // Return transformed data (token will be masked)
    return railwayTransformer.transform(railwayConfig);
  });
