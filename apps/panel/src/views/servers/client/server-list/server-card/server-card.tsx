import { Button, CopyInput, Heading, IconButton } from '@/components/ui';
import { useToast } from '@/hooks/toast';
import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import { VisuallyHidden } from '@/styled-system/jsx';
import { PauseIcon, PlayIcon, RefreshCwIcon, TrashIcon } from 'lucide-react';
import { useCallback } from 'react';
import { styles } from './server-card.styles';
import type { ServerCardProps } from './server-card.types';

export const ServerCard: React.FC<ServerCardProps> = ({
  server,
  onRefresh
}) => {
  const { formatMessage } = useFormatMessage();
  const toast = useToast();

  const startMutation = trpc.servers.start.useMutation();
  const stopMutation = trpc.servers.stop.useMutation();
  const restartMutation = trpc.servers.restart.useMutation();
  const deleteMutation = trpc.servers.delete.useMutation();

  const isRunning = server.enabled;
  const isLoading =
    startMutation.isPending ||
    stopMutation.isPending ||
    restartMutation.isPending ||
    deleteMutation.isPending;

  const handleStart = useCallback(async () => {
    try {
      await startMutation.mutateAsync({ serverId: server.id });
      toast.success(formatMessage('Server started'));
      onRefresh?.();
    } catch {
      toast.error(formatMessage('Failed to start server'));
    }
  }, [server.id, startMutation, toast, formatMessage, onRefresh]);

  const handleStop = useCallback(async () => {
    try {
      await stopMutation.mutateAsync({ serverId: server.id });
      toast.success(formatMessage('Server stopped'));
      onRefresh?.();
    } catch {
      toast.error(formatMessage('Failed to stop server'));
    }
  }, [server.id, stopMutation, toast, formatMessage, onRefresh]);

  const handleRestart = useCallback(async () => {
    try {
      await restartMutation.mutateAsync({ serverId: server.id });
      toast.success(formatMessage('Server restarted'));
      onRefresh?.();
    } catch {
      toast.error(formatMessage('Failed to restart server'));
    }
  }, [server.id, restartMutation, toast, formatMessage, onRefresh]);

  const handleDelete = useCallback(async () => {
    if (
      !window.confirm(
        formatMessage('Are you sure you want to delete this server?')
      )
    ) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({ serverId: server.id });
      toast.success(formatMessage('Server deleted'));
      onRefresh?.();
    } catch {
      toast.error(formatMessage('Failed to delete server'));
    }
  }, [server.id, deleteMutation, toast, formatMessage, onRefresh]);

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
        <div data-placeholder>
          Status: {isRunning ? 'Running' : 'Stopped'}
          {server.connections?.[0] && (
            <div>Port: {server.connections[0].proxyPort}</div>
          )}
        </div>
      </div>
      {server.connections?.[0]?.domain && (
        <CopyInput
          value={`${server.connections[0].domain}:${server.connections[0].proxyPort}`}
          aria-label={formatMessage('Server address')}
        />
      )}
      <div className={styles.footer}>
        <IconButton
          aria-label={formatMessage('Delete <hidden>Server</hidden>', {
            hidden: text => <VisuallyHidden>{text}</VisuallyHidden>
          })}
          variant='outlined'
          disabled={isLoading}
          onClick={handleDelete}
        >
          <TrashIcon />
        </IconButton>
        {isRunning ? (
          <IconButton
            aria-label={formatMessage('Stop <hidden>Server</hidden>', {
              hidden: text => <VisuallyHidden>{text}</VisuallyHidden>
            })}
            variant='outlined'
            disabled={isLoading}
            onClick={handleStop}
          >
            <PauseIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label={formatMessage('Start <hidden>Server</hidden>', {
              hidden: text => <VisuallyHidden>{text}</VisuallyHidden>
            })}
            variant='outlined'
            disabled={isLoading}
            onClick={handleStart}
          >
            <PlayIcon />
          </IconButton>
        )}
        <IconButton
          aria-label={formatMessage('Restart <hidden>Server</hidden>', {
            hidden: text => <VisuallyHidden>{text}</VisuallyHidden>
          })}
          variant='outlined'
          disabled={isLoading || !isRunning}
          onClick={handleRestart}
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
