import { prisma } from '@/libs';
import { publicProcedure } from '@/trpc/procedures';

/**
 * Get the current setup status of the system
 * This is used to determine if onboarding is needed
 */
export const getSetupStatus = publicProcedure.query(async () => {
  // Run both queries in parallel for better performance
  const [userCount, railwayConfig] = await Promise.all([
    prisma.user.count(),
    prisma.railway.findUnique({
      where: {
        id: 'railway_config'
      }
    })
  ]);

  const hasUsers = userCount > 0;
  const hasRailwayConfig = Boolean(railwayConfig);
  const isComplete = hasUsers && hasRailwayConfig;

  return {
    isComplete,
    hasUsers,
    hasRailwayConfig
  };
});
