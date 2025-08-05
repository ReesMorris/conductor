import { AuthWrapper } from '@/components/features/auth-wrapper';
import { Heading, Separator } from '@/components/ui';
import { formatMessageServer } from '@/i18n/format-message-server';
import { page } from '@/libs/page';
import { VisuallyHidden } from '@/styled-system/jsx';
import { PersonalInformation } from './personal-information';
import { pageSchema } from './profile.schema';
import { ProfileSettingsSkeleton } from './profile.skeleton';
import { ProfilePhoto } from './profile-photo';

export const Page = page(pageSchema, async () => {
  return (
    <AuthWrapper skeleton={<ProfileSettingsSkeleton />}>
      <VisuallyHidden>
        <Heading level={1}>
          {await formatMessageServer('Profile Settings')}
        </Heading>
      </VisuallyHidden>

      <ProfilePhoto />
      <Separator />
      <PersonalInformation />
    </AuthWrapper>
  );
});
