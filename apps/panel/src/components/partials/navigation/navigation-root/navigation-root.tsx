import { cx } from '@/styled-system/css';
import { Wrapper } from '../../wrapper';
import type { NavigationProps } from './navigation.types';
import { styles } from './navigation-root.styles';

export const NavigationRoot: React.FC<NavigationProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={cx(styles.container, className)}>
      <Wrapper>
        <nav className={styles.navigation}>{children}</nav>
      </Wrapper>
    </div>
  );
};
