import { env } from '@/env';
import { createFetch } from '@better-fetch/fetch';
import type { OnboardingResponse } from '@conductor/api';
import urlJoin from 'url-join';

/**
 * tRPC response format
 */
interface TRPCResponse<T> {
  result: {
    data: {
      json: T;
    };
  };
}

/**
 * Create a better-fetch instance configured for the API
 */
const $fetch = createFetch({ baseURL: env.API_URL });

/**
 * Check the system setup status from the API
 */
export const checkSetupStatus =
  async (): Promise<OnboardingResponse | null> => {
    try {
      // Call the tRPC endpoint using better-fetch
      const { data, error } = await $fetch<TRPCResponse<OnboardingResponse>>(
        urlJoin('/trpc', 'onboarding.getOnboardingStatus'),
        { method: 'GET' }
      );

      if (error) {
        console.error('Failed to check setup status:', error);
        return null;
      }

      // Return the onboarding status from the response
      return data?.result?.data.json;
    } catch (error) {
      console.error('Error checking setup status:', error);
      return null;
    }
  };
