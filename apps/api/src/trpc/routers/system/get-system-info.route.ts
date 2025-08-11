import { protectedProcedure } from '@/trpc/procedures';
import packageJson from '../../../../../../package.json';

/**
 * Get system information including version and environment details
 */
export const getSystemInfo = protectedProcedure.query(() => {
  return {
    version: packageJson.version,
    nodeVersion: process.version,
    platform: process.platform,
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  };
});
