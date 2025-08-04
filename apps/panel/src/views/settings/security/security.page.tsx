import { AuthWrapper } from '@/components/features/auth-wrapper';
import { Separator } from '@/components/ui';
import { ActiveSessions } from './active-sessions';
import { EmailSettingsForm } from './email-settings-form';
import { SecuritySettingsSkeleton } from './security.skeleton';

export const Page = () => {
  return (
    <AuthWrapper skeleton={<SecuritySettingsSkeleton />}>
      <EmailSettingsForm />
      <Separator />
      <ActiveSessions />
    </AuthWrapper>
  );
};
