import { cx } from '@/styled-system/css';
import { styles } from './header.styles';
import type { HeaderProps } from './header.types';
import { HeaderLogo } from './header-logo';
import { ServerSelector } from './server-selector';
import { UserMenu } from './user-menu';

export const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
  return (
    <header {...props} className={cx(styles.header, className)}>
      <div className={styles.content}>
        <div className={styles.left}>
          <HeaderLogo />
          <ServerSelector />
        </div>

        <div className={styles.right}>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
