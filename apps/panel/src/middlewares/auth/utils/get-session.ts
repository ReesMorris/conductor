import { getAuthBaseUrl } from '@/utils/get-auth-base-url';
import { createAuthClient } from 'better-auth/react';
import type { NextRequest } from 'next/server';

/**
 * Attempts to get the session from Better Auth.
 */
export const getSession = async (request: NextRequest) => {
  // Create a minimal auth client just for session checking
  const auth = createAuthClient({
    baseURL: getAuthBaseUrl()
  });

  try {
    // Better Auth stores the session in cookies
    const response = await auth.getSession({
      fetchOptions: {
        headers: {
          cookie: request.headers.get('cookie') || ''
        }
      }
    });

    return response.data;
  } catch {
    return null;
  }
};
