import { AddServerDialog } from '@/components/features/add-server-dialog';
import { Button, Heading } from '@/components/ui';
import { useUser } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { ServerCard } from './server-card';
import { styles } from './server-list.styles';
import type { ServerListProps } from './server-list.types';

const HEADING_ID = 'server-list-heading';

export const ServerList: React.FC<ServerListProps> = ({
  servers,
  onRefresh
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { formatMessage } = useFormatMessage();
  const { user } = useUser();

  const handleClick = () => {
    setDialogOpen(true);
  };

  return (
    <>
      {user?.role === 'admin' && (
        <AddServerDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSuccess={onRefresh}
        />
      )}

      <div className={styles.header}>
        <Heading unstyled id={HEADING_ID} level={1} className={styles.title}>
          {formatMessage('Servers')}
        </Heading>

        {user?.role === 'admin' && (
          <Button type='button' variant='primary' onClick={handleClick}>
            <PlusIcon />
            {formatMessage('Add Server')}
          </Button>
        )}
      </div>
      <ul className={styles.grid} aria-labelledby={HEADING_ID}>
        {servers.map(server => (
          <li key={server.id}>
            <ServerCard server={server} onRefresh={onRefresh} />
          </li>
        ))}
      </ul>
    </>
  );
};
