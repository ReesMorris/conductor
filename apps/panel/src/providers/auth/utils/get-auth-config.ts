import 'server-only';

import { getAuthBaseUrl } from '@/utils/get-auth-base-url';
import type { ClientOptions } from 'better-auth';

export const getAuthConfig = (): ClientOptions => {
  return {
    baseURL: getAuthBaseUrl()
  };
};
