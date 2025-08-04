import { AuthWrapper } from '@/components/features/auth-wrapper';
import { ProfileSettingsSkeleton } from './profile.skeleton';
import { ProfileSettingsForm } from './profile-settings-form';

export const Page = () => {
  return (
    <AuthWrapper skeleton={<ProfileSettingsSkeleton />}>
      <ProfileSettingsForm />
    </AuthWrapper>
  );
};
