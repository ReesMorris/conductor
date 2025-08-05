import { Field, PasswordInput } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { useFormContext } from 'react-hook-form';
import type { ResetPasswordFormData } from '../reset-password-form.schema';

export const NewPasswordField: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const { register, formState } = useFormContext<ResetPasswordFormData>();

  return (
    <Field
      label={formatMessage('New Password')}
      errorMessage={formState.errors.newPassword?.message}
    >
      <PasswordInput {...register('newPassword')} autoComplete='new-password' />
    </Field>
  );
};
