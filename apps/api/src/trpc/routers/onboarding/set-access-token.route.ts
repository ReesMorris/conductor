import { createRailwayService } from '@/services/railway';
import { adminProcedure } from '@/trpc/procedures';
import { encrypt } from '@/utils/encryption';
import { prisma } from '@conductor/database';
import { TRPCError } from '@trpc/server';
import z from 'zod';

/**
 * Sets the Railway access token as part of the onboarding process.
 * This endpoint is only accessible during the initial setup and can
 * only be called by an admin user.
 */
export const setAccessToken = adminProcedure
  .input(
    z.object({
      accessToken: z.uuidv4()
    })
  )
  .mutation(async ({ input }) => {
    // Only allow this if the configuration does not already exist
    const existingRailwayConfig = await prisma.railway.findFirst();
    if (existingRailwayConfig) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Railway configuration already exists. Cannot set up again.'
      });
    }

    // Create a Railway service instance with the PAT
    const railwayService = createRailwayService(input.accessToken, true);

    try {
      // Validate the token by getting current user
      await railwayService.getCurrentUser();
    } catch {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid Railway access token provided.'
      });
    }

    // Create the Railway configuration
    await prisma.railway.create({
      data: {
        id: 'railway_config',
        accessToken: encrypt(input.accessToken)
      }
    });
  });
