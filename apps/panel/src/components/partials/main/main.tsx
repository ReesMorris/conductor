import { cx } from '@/styled-system/css';
import { styles } from './main.styles';
import type { MainProps } from './main.types';

export const Main: React.FC<MainProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <main {...props} className={cx(styles.main, className)}>
      {children}
    </main>
  );
};
