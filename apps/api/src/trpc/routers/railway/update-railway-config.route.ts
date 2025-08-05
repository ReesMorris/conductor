import { prisma } from '@/libs';
import { railwayTransformer } from '@/transformers/railway';
import { protectedProcedure } from '@/trpc/procedures';
import { z } from 'zod';

/**
 * Update or create the Railway configuration
 * Uses singleton pattern with id='railway_config'
 */
export const updateRailwayConfig = protectedProcedure
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

    // Upsert the Railway configuration
    const railwayConfig = await prisma.railway.upsert({
      where: {
        id: 'railway_config'
      },
      create: {
        id: 'railway_config',
        projectToken: '',
        ...input
      },
      update: input
    });

    // Return transformed data
    return railwayTransformer.transform(railwayConfig);
  });
