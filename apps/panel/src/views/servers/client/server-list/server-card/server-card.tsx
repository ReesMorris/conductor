import { CopyInput, Heading } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { ServerActions } from './server-actions';
import { styles } from './server-card.styles';
import type { ServerCardProps } from './server-card.types';

export const ServerCard: React.FC<ServerCardProps> = ({
  server,
  onRefresh
}) => {
  const { formatMessage } = useFormatMessage();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.serverIcon} />

        <div>
          <Heading unstyled level={2} className={styles.title}>
            {server.name}
          </Heading>
          <div className={styles.type}>{server.gameId}</div>
          <div className={styles.serverStatus} data-status='unknown' />
        </div>
      </div>

      <div className={styles.stats}>
        <div data-placeholder>Metrics will show here (coming soon)</div>
      </div>

      {server.connectionUrl && (
        <CopyInput
          value={server.connectionUrl}
          aria-label={formatMessage('Server address')}
        />
      )}

      <ServerActions server={server} onRefresh={onRefresh} />
    </div>
  );
};
