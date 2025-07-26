'use client';

import type { ClientOptions } from 'better-auth';
import { createAuthClient } from 'better-auth/react';

export const createAuthClientWithConfig = (options: ClientOptions) => {
  return createAuthClient({
    baseURL: options.baseURL
  });
};
