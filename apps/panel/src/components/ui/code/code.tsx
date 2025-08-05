import { cx } from '@/styled-system/css';
import { styles } from './code.styles';
import type { CodeProps } from './code.types';

export const Code: React.FC<CodeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <code className={cx(styles.code, className)} {...props}>
      {children}
    </code>
  );
};
