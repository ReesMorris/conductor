import { AuthWrapper } from '@/components/features/auth-wrapper';
import { Heading, Separator } from '@/components/ui';
import { formatMessageServer } from '@/i18n/format-message-server';
import { page } from '@/libs/page';
import { VisuallyHidden } from '@/styled-system/jsx';
import { ActiveSessions } from './active-sessions';
import { EmailSettings } from './email-settings';
import { pageSchema } from './security.schema';
import { SecuritySettingsSkeleton } from './security.skeleton';

export const Page = page(pageSchema, async () => {
  return (
    <AuthWrapper skeleton={<SecuritySettingsSkeleton />}>
      <VisuallyHidden>
        <Heading level={1}>
          {await formatMessageServer('Security Settings')}
        </Heading>
      </VisuallyHidden>

      <EmailSettings />
      <Separator />
      <ActiveSessions />
    </AuthWrapper>
  );
});
