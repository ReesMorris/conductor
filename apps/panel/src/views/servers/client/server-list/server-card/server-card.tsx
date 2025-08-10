import { Button, CopyInput, Heading, IconButton } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { VisuallyHidden } from '@/styled-system/jsx';
import { RefreshCwIcon, SquareIcon } from 'lucide-react';
import { styles } from './server-card.styles';
import type { ServerCardProps } from './server-card.types';

export const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  const { formatMessage } = useFormatMessage();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon} />
        <div>
          <Heading unstyled level={2} className={styles.title}>
            {server.name}
          </Heading>
          <div className={styles.type}>{server.gameId}</div>
        </div>
      </div>
      <div className={styles.stats}>
        <div data-placeholder>Stats will go here</div>
      </div>
      <CopyInput value={server.id} aria-label={formatMessage('Server ID')} />
      <div className={styles.footer}>
        <IconButton
          aria-label={formatMessage('Delete <hidden>Server</hidden>', {
            hidden: text => <VisuallyHidden>{text}</VisuallyHidden>
          })}
          variant='outlined'
          disabled
        >
          <SquareIcon />
        </IconButton>
        <IconButton
          aria-label={formatMessage('Restart <hidden>Server</hidden>', {
            hidden: text => <VisuallyHidden>{text}</VisuallyHidden>
          })}
          variant='outlined'
          disabled
        >
          <RefreshCwIcon />
        </IconButton>
        <Button className={styles.manageButton} disabled>
          {formatMessage('Manage')}
        </Button>
      </div>
    </div>
  );
};
