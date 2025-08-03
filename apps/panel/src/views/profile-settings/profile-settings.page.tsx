import { ActionBar, Separator } from '@/components/ui';
import { ProfilePhoto } from './profile-photo';

export const Page = () => {
  return (
    <>
      <ProfilePhoto />
      <Separator />

      <ActionBar open />
    </>
  );
};
