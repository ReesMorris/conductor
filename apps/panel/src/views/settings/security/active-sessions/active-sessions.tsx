'use client';

import { Alert, Heading } from '@/components/ui';
import { useAuth } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { getAuthErrorMessage } from '@/i18n/mappings';
import { useQuery } from '@tanstack/react-query';
import { styles } from './active-sessions.styles';
import { SessionCard } from './session-card';
import { SessionSkeleton } from './session-skeleton';

const ID = 'active-sessions-heading';

export const ActiveSessions: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const auth = useAuth();

  const {
    data: sessions = [],
    error,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['active-sessions'],
    queryFn: async () => {
      const result = await auth.listSessions();
      if (result.error) {
        throw new Error(result.error.code);
      }
      return result.data || [];
    },
    staleTime: 30_000, // Consider data stale after 30 seconds
    refetchOnWindowFocus: true, // Refetch when window regains focus for security
    retry: 2 // Limit retries for auth operations
  });

  return (
    <section aria-labelledby={ID}>
      <Heading level={2} id={ID}>
        {formatMessage('Active Sessions')}
      </Heading>

      {error && (
        <Alert color='error'>
          {getAuthErrorMessage(formatMessage, error.message)}
        </Alert>
      )}

      {isLoading && <SessionSkeleton />}

      {!isLoading && !error && sessions.length === 0 && (
        <p>{formatMessage('No active sessions found.')}</p>
      )}

      {sessions.length > 0 && (
        <ul
          aria-label={formatMessage('Active Sessions List')}
          className={styles.sessionList}
        >
          {sessions.map(session => (
            <li key={session.id}>
              <SessionCard session={session} onRevoked={refetch} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
