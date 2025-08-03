'use client';

import { FormWithActionBar } from '@/components/features/form-with-action-bar';
import { Separator } from '@/components/ui';
import { useFormWithActionBar, useUser } from '@/hooks';
import { PersonalInformation } from '../personal-information';
import { ProfilePhoto } from '../profile-photo';

interface ProfileFormData {
  name: string;
}

export const ProfileSettingsForm = () => {
  const { user } = useUser();

  const form = useFormWithActionBar<ProfileFormData>({
    defaultValues: {
      name: user?.name || ''
    },
    onSave: async data => {
      // TODO: Replace with actual API call
      console.log('Saving profile:', data);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Show success toast or handle errors
      console.log('Profile saved successfully');
    },
    onCancel: () => {
      console.log('Changes cancelled');
    }
  });

  return (
    <>
      <ProfilePhoto />
      <Separator />

      <FormWithActionBar form={form}>
        <PersonalInformation form={form} />
      </FormWithActionBar>
    </>
  );
};
