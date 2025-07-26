import { cx } from '@/styled-system/css';
import { styles } from './form.styles';
import type { FormProps } from './form.types';

export const Form: React.FC<FormProps> = ({ className, ...props }) => {
  return <form {...props} className={cx(styles.form, className)} />;
};
