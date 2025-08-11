'use client';

import { DeleteServerDialog } from '@/components/features/delete-server-dialog';
import { Button, IconButton } from '@/components/ui';
import { useUser } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { VisuallyHidden } from '@/styled-system/jsx';
import { TrashIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import type { ServerCardProps } from '../server-card.types';
import { styles } from './server-actions.styles';

export const ServerActions: React.FC<ServerCardProps> = ({
  server,
  onRefresh
}) => {
  const { formatMessage } = useFormatMessage();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { user } = useUser();

  const handleDeleteClick = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  return (
    <>
      {user?.role === 'admin' && (
        <DeleteServerDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          server={server}
          onSuccess={onRefresh}
        />
      )}

      <div className={styles.footer}>
        {user?.role === 'admin' && (
          <IconButton
            aria-label={formatMessage('Delete<hidden> Server</hidden>', {
              hidden: text => <VisuallyHidden>{text}</VisuallyHidden>
            })}
            variant='destructive'
            className={styles.deleteButton}
            onClick={handleDeleteClick}
          >
            <TrashIcon />
          </IconButton>
        )}

        <Button className={styles.manageButton} disabled>
          {formatMessage('Manage<hidden> Server</hidden>', {
            hidden: text => <VisuallyHidden>{text}</VisuallyHidden>
          })}
          (coming soon)
        </Button>
      </div>
    </>
  );
};
