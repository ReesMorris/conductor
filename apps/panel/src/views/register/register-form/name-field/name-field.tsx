import { Field, Input, InputGroup } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { MailIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { RegisterFormData } from '../register-form.schema';

export const NameField: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const { register, formState } = useFormContext<RegisterFormData>();

  return (
    <Field
      label={formatMessage('Your Name')}
      errorMessage={formState.errors.name?.message}
    >
      <InputGroup startElement={<MailIcon />}>
        <Input
          {...register('name')}
          placeholder={formatMessage('Alex Smith')}
          autoComplete='name'
        />
      </InputGroup>
    </Field>
  );
};
