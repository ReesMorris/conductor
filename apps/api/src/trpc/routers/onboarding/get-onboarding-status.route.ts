import { prisma } from '@/libs';
import type { OnboardingResponse } from '@/transformers';
import { publicProcedure } from '@/trpc/procedures';

/**
 * Get the current onboarding status of the system
 */
export const getOnboardingStatus = publicProcedure.query(
  async (): Promise<OnboardingResponse> => {
    // Run both queries in parallel for better performance
    const [userCount, railwayConfig] = await Promise.all([
      prisma.user.count(),
      prisma.railway.findUnique({
        where: {
          id: 'railway_config'
        }
      })
    ]);

    // Check conditions for onboarding status
    if (userCount === 0) {
      return 'NO_USERS';
    }
    if (!railwayConfig?.accessToken) {
      return 'NO_ACCESS_TOKEN';
    }

    return 'COMPLETE';
  }
);
