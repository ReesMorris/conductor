import { useFormatMessage } from '@/i18n/format-message';
import { FormActions, SettingsGrid, SettingsSection } from '../../components';
import { NameField } from './name-field';
import { PersonalInformationForm } from './personal-information-form';

export const PersonalInformation = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <SettingsSection label={formatMessage('Personal Information')}>
      <PersonalInformationForm>
        <SettingsGrid>
          <NameField />
        </SettingsGrid>
        <FormActions />
      </PersonalInformationForm>
    </SettingsSection>
  );
};
