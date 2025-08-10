'use client';

import { Main } from '@/components/partials';
import { trpc } from '@/providers/trpc';
import { EmptyMessage } from './empty-message';
import { ServerList, ServerListSkeleton } from './server-list';

export const Client = () => {
  const { data, refetch } = trpc.servers.list.useQuery();

  return (
    <Main>
      {data ? (
        data.length === 0 ? (
          <EmptyMessage />
        ) : (
          <ServerList servers={data} onRefresh={refetch} />
        )
      ) : (
        <ServerListSkeleton />
      )}
    </Main>
  );
};
