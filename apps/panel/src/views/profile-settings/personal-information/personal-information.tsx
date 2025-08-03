import { Heading } from '@/components/ui';
import { NameField } from './name-field';
import type { PersonalInformationProps } from './personal-information.types';

const ID = 'personal-information';

export const PersonalInformation: React.FC<PersonalInformationProps> = ({
  form
}) => {
  const { register, formState, isSaving } = form;
  const { errors } = formState;

  return (
    <section aria-labelledby={ID}>
      <Heading id={ID} level={2}>
        Personal Information
      </Heading>

      <NameField register={register} error={errors.name} isLoading={isSaving} />
    </section>
  );
};
