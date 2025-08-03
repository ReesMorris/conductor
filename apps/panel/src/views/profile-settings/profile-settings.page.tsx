import { AuthWrapper } from '@/components/features/auth-wrapper';
import { ActionBar, Separator } from '@/components/ui';
import { ProfilePhoto } from './profile-photo';
import { ProfileSettingsSkeleton } from './profile-settings.skeleton';

export const Page = () => {
  return (
    <AuthWrapper skeleton={<ProfileSettingsSkeleton />}>
      <ProfilePhoto />
      <Separator />

      <ActionBar open />
    </AuthWrapper>
  );
};
