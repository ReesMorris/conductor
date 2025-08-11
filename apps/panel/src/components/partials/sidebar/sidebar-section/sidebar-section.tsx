'use client';

import { Heading } from '@/components/ui';
import { useUser } from '@/hooks';
import { styles } from './sidebar-section.styles';
import type { SidebarSectionProps } from './sidebar-section.types';

export const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  className,
  children,
  userRole,
  ...props
}) => {
  const { user } = useUser();

  // Make sure we have permission to see this item
  if (userRole && user?.role !== userRole) {
    return null;
  }

  return (
    <div className={styles.container} {...props}>
      <Heading unstyled level={2} className={styles.title}>
        {title}
      </Heading>

      <div className={styles.content}>{children}</div>
    </div>
  );
};
