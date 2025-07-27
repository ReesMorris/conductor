'use client';

import { AuthClientProvider } from '@/lib/auth';
import type { ClientProps } from './client.types';

export const Client = ({ children, config }: ClientProps) => {
  return <AuthClientProvider config={config}>{children}</AuthClientProvider>;
};
