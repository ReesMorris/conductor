import { Heading } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { SettingsGrid } from '@/views/settings/components';
import { NameField } from './name-field';

const ID = 'personal-information';

export const PersonalInformation: React.FC = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <section aria-labelledby={ID}>
      <Heading id={ID} level={2}>
        {formatMessage('Personal Information')}
      </Heading>

      <SettingsGrid>
        <NameField />
      </SettingsGrid>
    </section>
  );
};
