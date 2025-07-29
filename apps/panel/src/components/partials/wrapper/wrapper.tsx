import { cx } from '@/styled-system/css';
import { styles } from './wrapper.styles';
import type { WrapperProps } from './wrapper.types';

export const Wrapper: React.FC<WrapperProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={cx(styles.wrapper, className)}>
      {children}
    </div>
  );
};
