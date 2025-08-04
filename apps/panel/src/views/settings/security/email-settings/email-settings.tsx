import { useFormatMessage } from '@/i18n/format-message';
import {
  FormActions,
  SettingsGrid,
  SettingsSection
} from '@/views/settings/components';
import { EmailField } from './email-field';
import { EmailSettingsForm } from './email-settings-form';

export const EmailSettings: React.FC = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <SettingsSection label={formatMessage('Email Settings')}>
      <EmailSettingsForm>
        <SettingsGrid>
          <EmailField />
        </SettingsGrid>
        <FormActions />
      </EmailSettingsForm>
    </SettingsSection>
  );
};
