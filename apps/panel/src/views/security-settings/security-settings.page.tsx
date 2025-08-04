import { AuthWrapper } from '@/components/features/auth-wrapper';
import { Separator } from '@/components/ui';
import { EmailSettingsForm } from './email-settings-form';
import { SecuritySettingsSkeleton } from './security-settings.skeleton';

export const Page = () => {
  return (
    <AuthWrapper skeleton={<SecuritySettingsSkeleton />}>
      <EmailSettingsForm />
      <Separator />
    </AuthWrapper>
  );
};
