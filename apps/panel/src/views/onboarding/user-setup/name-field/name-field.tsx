import { Field, Input, InputGroup } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { IdCardIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { UserSetupFormData } from '../user-setup.schema';

export const NameField: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const { register, formState } = useFormContext<UserSetupFormData>();

  return (
    <Field
      label={formatMessage('Your Name')}
      errorMessage={formState.errors.name?.message}
    >
      <InputGroup startElement={<IdCardIcon />}>
        <Input
          {...register('name')}
          placeholder={formatMessage('Alex Smith')}
          autoComplete='name'
        />
      </InputGroup>
    </Field>
  );
};
