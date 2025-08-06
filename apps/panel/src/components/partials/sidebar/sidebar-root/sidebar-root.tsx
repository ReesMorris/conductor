'use client';

import { useUser } from '@/hooks';
import { cx } from '@/styled-system/css';
import type { SidebarProps } from './sidebar.types';
import { styles } from './sidebar-root.styles';

export const SidebarRoot: React.FC<SidebarProps> = ({
  children,
  className,
  ...props
}) => {
  const { user } = useUser();

  return (
    <aside
      {...props}
      className={cx(styles.container, className)}
      aria-busy={!user}
    >
      {user ? children : null}
    </aside>
  );
};
