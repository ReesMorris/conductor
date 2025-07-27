import 'server-only';

import { env } from '@/env';
import urlJoin from 'url-join';

/**
 * Get the base URL for the authentication API
 * This is used to construct the full URL for auth-related requests
 */
export const getAuthBaseUrl = () => {
  return urlJoin(env.API_URL, 'auth');
};
