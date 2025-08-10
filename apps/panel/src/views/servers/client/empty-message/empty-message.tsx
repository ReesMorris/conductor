'use client';

import { AddServerDialog } from '@/components/features/add-server-dialog';
import { Button, EmptyState } from '@/components/ui';
import { APP_NAME } from '@/constants';
import { useFormatMessage } from '@/i18n/format-message';
import { PlusIcon, ServerIcon } from 'lucide-react';
import { useState } from 'react';
import type { EmptyMessageProps } from './empty-message.types';

export const EmptyMessage: React.FC<EmptyMessageProps> = ({ onRefresh }) => {
  const { formatMessage } = useFormatMessage();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <AddServerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={onRefresh}
      />

      <EmptyState
        indicator={<ServerIcon />}
        title={formatMessage('No servers yet')}
        description={formatMessage(
          'Add your first server to get started with {appName}',
          { appName: APP_NAME }
        )}
        actions={
          <Button
            type='button'
            variant='primary'
            size='lg'
            onClick={handleClick}
          >
            <PlusIcon />
            {formatMessage('Add Server')}
          </Button>
        }
      />
    </>
  );
};
