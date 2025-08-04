import 'server-only';

import { getAuthBaseUrl } from '@/utils/get-auth-base-url';
import type { AuthClientConfig } from '@conductor/auth';

export const getAuthConfig = (): AuthClientConfig => ({
  baseURL: getAuthBaseUrl()
});
