'use client';

import { Button, Heading } from '@/components/ui';
import { Badge } from '@/components/ui/badge';
import { useAuth, useSession, useToast } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { useRouter } from '@/i18n/navigation';
import { VisuallyHidden } from '@/styled-system/jsx';
import { route } from '@/utils/route';
import { LogOutIcon, TrashIcon } from 'lucide-react';
import { useFormatter } from 'next-intl';
import { useState } from 'react';
import { UAParser } from 'ua-parser-js';
import { styles } from './session-card.styles';
import type { SessionCardProps } from './session-card.types';

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onRevoked
}) => {
  const auth = useAuth();
  const currentSession = useSession();
  const { formatMessage } = useFormatMessage();
  const { relativeTime } = useFormatter();
  const router = useRouter();
  const toast = useToast();
  const [isRevoking, setIsRevoking] = useState(false);

  // Parse the user agent
  const parser = new UAParser(session.userAgent ?? '');

  // Check if the session is the current session
  const isCurrent = currentSession?.data?.session.id === session.id;

  // Handle session revocation
  const revokeSession = async () => {
    if (isRevoking) {
      return;
    }

    try {
      setIsRevoking(true);
      const res = await auth.revokeSession({ token: session.token });
      if (res.error) {
        throw new Error(res.error.message);
      }

      if (isCurrent) {
        router.push(route('LOGIN'));
      } else {
        onRevoked?.();
        toast.success(formatMessage('Session revoked successfully'));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(formatMessage('Failed to remove session'), message);
      setIsRevoking(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <Heading unstyled level={3} className={styles.title}>
          {formatMessage('{browser} on {os}', {
            browser:
              parser.getBrowser().name || formatMessage('Unknown Browser'),
            os: parser.getOS().name || formatMessage('Unknown OS')
          })}

          {isCurrent && <Badge color='green'>{formatMessage('Current')}</Badge>}
        </Heading>

        <dl
          aria-label={formatMessage('Session Details')}
          className={styles.details}
        >
          <dt>{formatMessage('IP Address')}</dt>
          <dd>
            {session.ipAddress || (
              <VisuallyHidden>{formatMessage('Unknown')}</VisuallyHidden>
            )}
          </dd>
          <dt>{formatMessage('Last Active')}</dt>
          <dd>
            {session.updatedAt ? (
              relativeTime(session.updatedAt)
            ) : (
              <VisuallyHidden>{formatMessage('Unknown')}</VisuallyHidden>
            )}
          </dd>
        </dl>
      </div>

      <div className={styles.right}>
        <Button
          type='button'
          variant='destructive'
          size='sm'
          onClick={revokeSession}
          isLoading={isRevoking}
        >
          {isCurrent ? <LogOutIcon /> : <TrashIcon />}
          {isCurrent
            ? formatMessage('Log Out')
            : formatMessage('Remove Session')}
        </Button>
      </div>
    </div>
  );
};
