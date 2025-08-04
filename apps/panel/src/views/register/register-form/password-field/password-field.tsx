import { Field, PasswordInput } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { useFormContext } from 'react-hook-form';
import type { RegisterFormData } from '../register-form.schema';

export const PasswordField: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const { register, formState } = useFormContext<RegisterFormData>();

  return (
    <Field
      label={formatMessage('Password')}
      errorMessage={formState.errors.password?.message}
    >
      <PasswordInput {...register('password')} autoComplete='new-password' />
    </Field>
  );
};
