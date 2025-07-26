import { cx } from '@/styled-system/css';
import { styles } from './alert.styles';
import type { AlertProps } from './alert.types';

export const Alert: React.FC<AlertProps> = ({
  variant,
  children,
  className,
  ...props
}) => {
  return (
    <div
      aria-live='assertive'
      {...props}
      className={cx(styles.alert({ variant }), className)}
    >
      {children}
    </div>
  );
};
