import { prisma } from '@/libs';
import { railwayTransformer } from '@/transformers/railway';
import { adminProcedure } from '@/trpc/procedures';

/**
 * Get the current Railway configuration
 * Returns null if no configuration exists
 */
export const getRailwayConfig = adminProcedure.query(async () => {
  const railwayConfig = await prisma.railway.findUnique({
    where: {
      id: 'railway_config'
    }
  });

  if (!railwayConfig) {
    return null;
  }

  return railwayTransformer.transform(railwayConfig);
});
