import { prisma } from '@/libs';
import { createRailwayService } from '@/services/railway/railway.service';
import { railwayTransformer } from '@/transformers/railway';
import { publicProcedure } from '@/trpc/procedures';
import { encrypt } from '@/utils/encryption';
import { z } from 'zod';

/**
 * Initial Railway configuration setup
 * This endpoint is public but only works during initial system setup
 * when no users exist in the database
 */
export const initialRailwaySetup = publicProcedure
  .input(
    z.object({
      accessToken: z.uuidv4(),
      projectId: z.string().optional(),
      environmentId: z.string().optional()
    })
  )
  .mutation(async ({ input }) => {
    // Security check: Only allow this during initial setup
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      throw new Error(
        'Initial setup can only be performed when no users exist. Please use the settings page to update Railway configuration.'
      );
    }

    // If projectId and environmentId are not provided, fetch them from Railway
    let projectId = input.projectId;
    let environmentId = input.environmentId;

    if (!projectId || !environmentId) {
      try {
        // Create a Railway service instance with the PAT
        const railwayService = createRailwayService(input.accessToken, true);

        // Validate the token by getting current user
        await railwayService.getCurrentUser();

        // Get user's projects
        const projectsResponse = await railwayService.getUserProjects();

        // Get the first project and environment if not provided
        const firstProject = projectsResponse.projects?.edges?.[0]?.node;
        if (firstProject && (!projectId || !environmentId)) {
          projectId = projectId || firstProject.id;
          environmentId =
            environmentId || firstProject.environments?.edges?.[0]?.node?.id;
        }
      } catch (_error) {
        throw new Error(
          'Invalid Railway Personal Access Token. Please generate a PAT from Railway Dashboard → Account Settings → Tokens'
        );
      }
    }

    if (!projectId || !environmentId) {
      throw new Error(
        'Could not determine project or environment. Please ensure your Railway account has at least one project.'
      );
    }

    // Prepare data with encryption
    const dataToSave = {
      accessToken: encrypt(input.accessToken),
      projectId,
      environmentId
    };

    // Create the Railway configuration
    const railwayConfig = await prisma.railway.create({
      data: {
        id: 'railway_config',
        ...dataToSave
      }
    });

    // Return transformed data (token will be masked)
    return railwayTransformer.transform(railwayConfig);
  });
