import 'server-only';

import { env } from '@/env';
import type { ClientOptions } from 'better-auth';
import urlJoin from 'url-join';

export const getAuthConfig = (): ClientOptions => {
  return {
    baseURL: urlJoin(env.API_URL, 'auth')
  };
};
