'use client';

import { FormWithActionBar } from '@/components/features/form-with-action-bar';
import { Separator } from '@/components/ui';
import { useFormWithActionBar, useToast, useUser } from '@/hooks';
import { trpc } from '@/providers/trpc';
import { useUserStore } from '@/stores';
import { getDirtyFields } from '@/utils/get-dirty-fields';
import { PersonalInformation } from '../personal-information';
import { ProfilePhoto } from '../profile-photo';

interface ProfileFormData {
  name: string;
}

export const ProfileSettingsForm = () => {
  const { user } = useUser();
  const toast = useToast();
  const updateUser = useUserStore(state => state.updateUser);

  const updateProfileMutation = trpc.profile.updateProfile.useMutation({
    onSuccess: updatedUser => {
      updateUser(updatedUser);
      toast.success('Profile settings updated');
    },
    onError: error => {
      toast.error('Failed to update profile settings', error.message);
    }
  });

  const form = useFormWithActionBar<ProfileFormData>({
    defaultValues: {
      name: user?.name || ''
    },
    onSave: async data => {
      // Get only the fields that have changed
      const changedData = getDirtyFields(data, form.formState.dirtyFields);
      if (Object.keys(changedData).length === 0) {
        return;
      }

      // Call the mutation with only changed fields
      await updateProfileMutation.mutateAsync(changedData);
    },
    onCancel: () => {
      // Reset the mutation state when cancelling
      updateProfileMutation.reset();
    }
  });

  return (
    <>
      <ProfilePhoto />
      <Separator />

      <FormWithActionBar form={form}>
        <PersonalInformation />
      </FormWithActionBar>
    </>
  );
};
