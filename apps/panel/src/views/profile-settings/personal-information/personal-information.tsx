import { Heading } from '@/components/ui';
import { NameField } from './name-field';
import { styles } from './personal-information.styles';

const ID = 'personal-information';

export const PersonalInformation: React.FC = () => {
  return (
    <section aria-labelledby={ID}>
      <Heading id={ID} level={2}>
        Personal Information
      </Heading>

      <div className={styles.grid}>
        <NameField />
      </div>
    </section>
  );
};
