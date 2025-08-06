import { prisma } from '@/libs';
import { createRailwayService } from '@/services/railway/railway.service';
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
      accessToken: z.uuidv4().optional()
    })
  )
  .mutation(async ({ input }) => {
    // Ensure at least one field is provided
    if (Object.keys(input).length === 0) {
      throw new Error('No fields to update');
    }

    // If a new token is provided, validate it with Railway API
    let projectId: string | undefined;
    let environmentId: string | undefined;

    if (input.accessToken) {
      try {
        // Create a Railway service instance with the PAT
        const railwayService = createRailwayService(input.accessToken, true);

        // Validate the token by getting current user
        await railwayService.getCurrentUser();

        // Get user's projects
        const projectsResponse = await railwayService.getUserProjects();

        // Get the first project and environment
        const firstProject = projectsResponse.projects?.edges?.[0]?.node;
        if (firstProject) {
          projectId = firstProject.id;
          environmentId = firstProject.environments?.edges?.[0]?.node?.id;
        }
      } catch (_error) {
        throw new Error(
          'Invalid Railway Personal Access Token. Please generate a PAT from Railway Dashboard → Account Settings → Tokens'
        );
      }
    }

    // Since access token is required for validation, we always have all fields
    if (!input.accessToken || !projectId || !environmentId) {
      throw new Error('Railway configuration is incomplete');
    }

    // Prepare data with encryption
    const dataToSave = {
      accessToken: encrypt(input.accessToken),
      projectId,
      environmentId
    };

    // Upsert the Railway configuration
    const railwayConfig = await prisma.railway.upsert({
      where: {
        id: 'railway_config'
      },
      create: {
        id: 'railway_config',
        ...dataToSave
      },
      update: dataToSave
    });

    // Return transformed data (token will be masked)
    return railwayTransformer.transform(railwayConfig);
  });
