import { Button, EmptyState } from '@/components/ui';
import { APP_NAME } from '@/constants';
import { useFormatMessage } from '@/i18n/format-message';
import { PlusIcon, ServerIcon } from 'lucide-react';

export const EmptyMessage = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <EmptyState
      indicator={<ServerIcon />}
      title={formatMessage('No servers yet')}
      description={formatMessage(
        'Add your first server to get started with {appName}',
        { appName: APP_NAME }
      )}
      actions={
        <Button type='button' variant='primary' size='lg'>
          <PlusIcon />
          {formatMessage('Add Server')}
        </Button>
      }
    />
  );
};
