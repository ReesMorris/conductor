'use client';

import { Separator } from '@/components/ui';
import { PersonalInformationSkeleton } from './personal-information';
import { ProfilePhotoSkeleton } from './profile-photo';

export const ProfileSettingsSkeleton: React.FC = () => {
  return (
    <>
      <ProfilePhotoSkeleton />
      <Separator />
      <PersonalInformationSkeleton />
    </>
  );
};
