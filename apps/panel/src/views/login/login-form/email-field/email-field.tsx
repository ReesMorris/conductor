import { Field, Input, InputGroup } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { MailIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { LoginFormData } from '../login-form.schema';

export const EmailField: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const { register, formState } = useFormContext<LoginFormData>();

  return (
    <Field
      label={formatMessage('Email Address')}
      errorMessage={formState.errors.email?.message}
    >
      <InputGroup startElement={<MailIcon />}>
        <Input
          {...register('email')}
          placeholder={formatMessage('alex.smith@example.com')}
          autoComplete='email'
        />
      </InputGroup>
    </Field>
  );
};
