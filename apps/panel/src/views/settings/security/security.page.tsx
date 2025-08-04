import { AuthWrapper } from '@/components/features/auth-wrapper';
import { Heading, Separator } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { VisuallyHidden } from '@/styled-system/jsx';
import { ActiveSessions } from './active-sessions';
import { EmailSettings } from './email-settings';
import { SecuritySettingsSkeleton } from './security.skeleton';

export const Page = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <AuthWrapper skeleton={<SecuritySettingsSkeleton />}>
      <VisuallyHidden>
        <Heading level={1}>{formatMessage('Security Settings')}</Heading>
      </VisuallyHidden>

      <EmailSettings />
      <Separator />
      <ActiveSessions />
    </AuthWrapper>
  );
};
