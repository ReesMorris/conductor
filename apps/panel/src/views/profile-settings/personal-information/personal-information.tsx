import { Heading } from '@/components/ui';
import { NameField } from './name-field';

const ID = 'personal-information';

export const PersonalInformation: React.FC = () => {
  return (
    <section aria-labelledby={ID}>
      <Heading id={ID} level={2}>
        Personal Information
      </Heading>

      <NameField />
    </section>
  );
};
