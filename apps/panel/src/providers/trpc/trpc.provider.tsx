'use client';

import type { AppRouter } from '@conductor/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import { useState } from 'react';
import superjson from 'superjson';
import urlJoin from 'url-join';
import type { TRPCProviderProps } from './trpc.types';

export const trpc = createTRPCReact<AppRouter>();

export const TrpcProvider: React.FC<TRPCProviderProps> = ({
  children,
  apiUrl
}) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: urlJoin(apiUrl, 'trpc'),
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include'
            } as RequestInit);
          },
          transformer: superjson
        })
      ]
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
