'use client';

import { DeleteServerDialog } from '@/components/features/delete-server-dialog';
import { Button, IconButton } from '@/components/ui';
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

  const handleDeleteClick = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  return (
    <>
      <DeleteServerDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        server={server}
        onSuccess={onRefresh}
      />

      <div className={styles.footer}>
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
