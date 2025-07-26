import 'server-only';

import { env } from '@/env';
import type { ClientOptions } from 'better-auth';

export const getAuthConfig = (): ClientOptions => {
  return {
    baseURL: env.API_URL
  };
};
