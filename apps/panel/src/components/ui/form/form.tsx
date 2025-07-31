import { cx } from '@/styled-system/css';
import { AlertTriangle } from 'lucide-react';
import { Alert } from '../alert';
import { styles } from './form.styles';
import type { FormProps } from './form.types';

export const Form: React.FC<FormProps> = ({
  errorMessage,
  className,
  children,
  ...props
}) => {
  return (
    <form {...props} className={cx(styles.form, className)}>
      {errorMessage && (
        <Alert color='error' icon={<AlertTriangle />}>
          {errorMessage}
        </Alert>
      )}

      {children}
    </form>
  );
};
