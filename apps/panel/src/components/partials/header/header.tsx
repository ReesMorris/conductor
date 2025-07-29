import { ServerSelector } from '@/components/features/server-selector';
import { cx } from '@/styled-system/css';
import { Wrapper } from '../wrapper';
import { styles } from './header.styles';
import type { HeaderProps } from './header.types';
import { HeaderLogo } from './header-logo';
import { UserMenu } from './user-menu';

export const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
  return (
    <header {...props} className={cx(styles.header, className)}>
      <Wrapper className={styles.content}>
        <div className={styles.left}>
          <HeaderLogo />
          <ServerSelector />
        </div>

        <div className={styles.right}>
          <UserMenu />
        </div>
      </Wrapper>
    </header>
  );
};
