import { useFormatMessage } from '@/i18n/format-message';
import {
  FormActions,
  SettingsGrid,
  SettingsSection
} from '@/views/settings/components';
import { RegionalSettingsForm } from './regional-settings-form';
import { TimeZoneField } from './time-zone-field';

export const RegionalSettings = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <RegionalSettingsForm>
      <SettingsSection label={formatMessage('Regional Settings')}>
        <SettingsGrid>
          <TimeZoneField />
        </SettingsGrid>
        <FormActions />
      </SettingsSection>
    </RegionalSettingsForm>
  );
};
