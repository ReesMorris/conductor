import { AuthWrapper } from '@/components/features/auth-wrapper';
import { Heading, Separator } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { VisuallyHidden } from '@/styled-system/jsx';
import { PersonalInformation } from './personal-information';
import { ProfileSettingsSkeleton } from './profile.skeleton';
import { ProfilePhoto } from './profile-photo';

export const Page = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <AuthWrapper skeleton={<ProfileSettingsSkeleton />}>
      <VisuallyHidden>
        <Heading level={1}>{formatMessage('Profile Settings')}</Heading>
      </VisuallyHidden>

      <ProfilePhoto />
      <Separator />
      <PersonalInformation />
    </AuthWrapper>
  );
};
