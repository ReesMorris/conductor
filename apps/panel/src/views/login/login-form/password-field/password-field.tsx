import { Field, Link, PasswordInput } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { VisuallyHidden } from '@/styled-system/jsx';
import { route } from '@/utils/route';
import { useFormContext } from 'react-hook-form';
import type { LoginFormData } from '../login-form.schema';
import { styles } from './password-field.styles';

export const PasswordField: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const { register, formState } = useFormContext<LoginFormData>();

  return (
    <Field
      label={formatMessage('Password')}
      labelSuffix={
        <Link href={route('FORGOT_PASSWORD')} className={styles.forgotLink}>
          {formatMessage('Forgot<hidden> password</hidden>?', {
            hidden: text => <VisuallyHidden>{text}</VisuallyHidden>
          })}
        </Link>
      }
      errorMessage={formState.errors.password?.message}
    >
      <PasswordInput
        {...register('password')}
        autoComplete='current-password'
      />
    </Field>
  );
};
