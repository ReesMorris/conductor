import { env } from '@/env';
import type { AppRouter } from '@conductor/api';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import urlJoin from 'url-join';

/**
 * Server-side tRPC client for making API calls from server components
 */
export const api = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: urlJoin(env.API_URL, 'trpc'),
      headers() {
        return {
          'Content-Type': 'application/json'
        };
      },
      transformer: superjson
    })
  ]
});
