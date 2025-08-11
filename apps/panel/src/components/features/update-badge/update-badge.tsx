'use client';

import { Badge, Button, Code, Dialog, Link, Steps } from '@/components/ui';
import { useUpdateCheck } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { EllipsisVerticalIcon, TrendingUpIcon } from 'lucide-react';
import { useState } from 'react';
import { styles } from './update-badge.styles';

export const UpdateBadge: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const { updateInfo, hasUpdate } = useUpdateCheck();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Don't show anything if no update is available
  if (!hasUpdate || !updateInfo) {
    return null;
  }

  return (
    <>
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{formatMessage('Update Available')}</Dialog.Title>
            <Dialog.Description>
              {formatMessage(
                'A <link>new version</link> of the application is available!',
                {
                  link: text => (
                    <Link
                      href={updateInfo.releaseUrl ?? '#'}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {text}
                    </Link>
                  )
                }
              )}
            </Dialog.Description>
          </Dialog.Header>

          <Steps.Root aria-label={formatMessage('Update Steps')}>
            <Steps.Item>
              {formatMessage('Visit your Railway project dashboard')}
            </Steps.Item>
            <Steps.Item>
              {formatMessage('Click the <code>Conductor</code> service', {
                code: text => <Code>{text}</Code>
              })}
            </Steps.Item>
            <Steps.Item>
              {formatMessage(
                'Click the three dots (<icon></icon>) next to <strong>View Logs</strong> and select <strong>Redeploy</strong>',
                {
                  strong: text => <strong>{text}</strong>,
                  icon: () => (
                    <EllipsisVerticalIcon size={16} className={styles.icon} />
                  )
                }
              )}
            </Steps.Item>
            <Steps.Item>
              {formatMessage(
                'Confirm the redeployment and wait for it to complete'
              )}
            </Steps.Item>
          </Steps.Root>

          <Dialog.Footer>
            <Dialog.Cancel asChild>
              <Button variant='ghost'>
                {formatMessage('Remind Me Later')}
              </Button>
            </Dialog.Cancel>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>

      <button
        type='button'
        className={styles.button}
        onClick={() => setDialogOpen(true)}
      >
        <Badge color='green'>
          <TrendingUpIcon />
          {formatMessage('Update Available')}
        </Badge>
      </button>
    </>
  );
};
