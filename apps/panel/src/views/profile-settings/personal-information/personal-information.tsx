import { Heading } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { NameField } from './name-field';
import { styles } from './personal-information.styles';

const ID = 'personal-information';

export const PersonalInformation: React.FC = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <section aria-labelledby={ID}>
      <Heading id={ID} level={2}>
        {formatMessage('Personal Information')}
      </Heading>

      <div className={styles.grid}>
        <NameField />
      </div>
    </section>
  );
};
