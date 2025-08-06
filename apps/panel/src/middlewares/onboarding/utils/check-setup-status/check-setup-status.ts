import { env } from '@/env';
import { createFetch } from '@better-fetch/fetch';
import urlJoin from 'url-join';

/**
 * Setup status response from the API
 */
interface SetupStatus {
  isComplete: boolean;
  hasUsers: boolean;
  hasRailwayConfig: boolean;
}

/**
 * tRPC response format
 */
interface TRPCResponse<T> {
  result: {
    data: T;
  };
}

/**
 * Create a better-fetch instance configured for the API
 */
const $fetch = createFetch({ baseURL: env.API_URL });

/**
 * Check the system setup status from the API
 */
export const checkSetupStatus = async (): Promise<SetupStatus | null> => {
  try {
    // Call the tRPC endpoint using better-fetch
    const { data, error } = await $fetch<TRPCResponse<SetupStatus>>(
      urlJoin('/trpc', 'system.getSetupStatus'),
      { method: 'GET' }
    );

    if (error) {
      console.error('Failed to check setup status:', error);
      return null;
    }

    // tRPC response format includes result.data
    return data?.result?.data || null;
  } catch (error) {
    console.error('Error checking setup status:', error);
    return null;
  }
};
