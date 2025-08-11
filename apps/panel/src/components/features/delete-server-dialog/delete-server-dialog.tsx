'use client';

import { Alert, Button, Dialog, IconButton } from '@/components/ui';
import { APP_NAME } from '@/constants';
import { useToast } from '@/hooks/toast';
import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import { CheckCircleIcon, ExternalLinkIcon, RefreshCwIcon } from 'lucide-react';
import { useCallback } from 'react';
import { styles } from './delete-server-dialog.styles';
import type { DeleteServerDialogProps } from './delete-server-dialog.types';

export const DeleteServerDialog: React.FC<DeleteServerDialogProps> = ({
  open,
  onOpenChange,
  server,
  onSuccess
}) => {
  const { formatMessage } = useFormatMessage();
  const toast = useToast();

  // Queries and mutations
  const deleteMutation = trpc.servers.delete.useMutation();
  const deleteInfoQuery = trpc.servers.getDeleteInfo.useQuery(
    { serverId: server.id },
    { enabled: open }
  );

  const handleDelete = useCallback(async () => {
    try {
      await deleteMutation.mutateAsync({ serverId: server.id });
      toast.success(formatMessage('Server deleted successfully'));
      onOpenChange(false);
      onSuccess?.();
    } catch {
      toast.error(formatMessage('Failed to delete server'));
    }
  }, [
    server.id,
    deleteMutation,
    toast,
    formatMessage,
    onOpenChange,
    onSuccess
  ]);

  const handleOpenRailway = useCallback(() => {
    if (deleteInfoQuery.data?.railwayDashboardUrl) {
      window.open(deleteInfoQuery.data.railwayDashboardUrl, '_blank');
    }
  }, [deleteInfoQuery.data?.railwayDashboardUrl]);

  const isLoading = deleteInfoQuery.isLoading || deleteMutation.isPending;
  const canDelete = deleteInfoQuery.data?.canDelete ?? false;
  const railwayServiceExists =
    deleteInfoQuery.data?.railwayServiceExists ?? false;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{formatMessage('Delete Server')}</Dialog.Title>
          <Dialog.Description>
            {formatMessage(
              'This will remove the server from {appName}. This action cannot be undone.',
              { appName: APP_NAME }
            )}
          </Dialog.Description>
        </Dialog.Header>

        {!railwayServiceExists && canDelete && (
          <Alert color='success' icon={<CheckCircleIcon />}>
            {formatMessage(
              'This server is not running on Railway, so it can be deleted from {appName} safely.',
              { appName: APP_NAME }
            )}
          </Alert>
        )}

        {railwayServiceExists && (
          <Alert color='error'>
            {formatMessage(
              "<strong>This server is still running on Railway.</strong> We don't have the ability to delete it for you, so you will need to do that manually. Please remove the server and any volumes before deleting it from {appName}.",
              {
                appName: APP_NAME,
                strong: text => (
                  <strong className={styles.strong}>{text}</strong>
                )
              }
            )}

            <div className={styles.alertActions}>
              <IconButton
                variant='ghost'
                onClick={() => deleteInfoQuery.refetch()}
                isLoading={deleteInfoQuery.isRefetching}
                aria-label={formatMessage('Check Again')}
              >
                <RefreshCwIcon />
              </IconButton>

              {deleteInfoQuery.data?.railwayDashboardUrl && (
                <Button variant='ghost' onClick={handleOpenRailway}>
                  {formatMessage('View in Railway')}
                  <ExternalLinkIcon />
                </Button>
              )}
            </div>
          </Alert>
        )}

        <Dialog.Footer>
          <Dialog.Cancel asChild>
            <Button variant='ghost' disabled={isLoading}>
              {formatMessage('Cancel')}
            </Button>
          </Dialog.Cancel>
          <Dialog.Action asChild>
            <Button
              variant='destructive'
              isLoading={isLoading}
              onClick={handleDelete}
              disabled={isLoading || !canDelete}
            >
              {formatMessage('Delete')}
            </Button>
          </Dialog.Action>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
