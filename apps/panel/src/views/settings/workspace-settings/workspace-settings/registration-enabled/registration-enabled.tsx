import { useFormatMessage } from '@/i18n/format-message';
import { SettingsToggle } from '@/views/settings/components';
import { Controller, useFormContext } from 'react-hook-form';
import type { WorkspaceSettingsFormData } from '../workspace-settings.schema';

export const RegistrationEnabled: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const { control } = useFormContext<WorkspaceSettingsFormData>();

  return (
    <Controller
      name='registrationEnabled'
      control={control}
      render={({ field }) => (
        <SettingsToggle
          checked={field.value}
          onCheckedChange={field.onChange}
          label={formatMessage('Registration Enabled')}
          description={formatMessage(
            'Allow new users to register for accounts'
          )}
        />
      )}
    />
  );
};
