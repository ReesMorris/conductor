import { cx } from '@/styled-system/css';
import { styles } from './steps-root.styles';
import type { StepsRootProps } from './steps-root.types';

export const StepsRoot: React.FC<StepsRootProps> = ({
  'aria-label': ariaLabel,
  children,
  className,
  ...props
}) => {
  return (
    <nav
      {...props}
      aria-label={ariaLabel}
      className={cx(styles.root, className)}
    >
      <ol className={styles.list}>{children}</ol>
    </nav>
  );
};
