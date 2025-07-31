'use client';

import { Link } from '@/components/ui';
import { useSession } from '@/hooks';
import { usePathname } from '@/i18n/navigation';
import { isPageCurrent } from '@/utils/is-page-current';
import { styles } from './sidebar-item.styles';
import type { SidebarItemProps } from './sidebar-item.types';

export const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon,
  label,
  userRole: role
}) => {
  const pathname = usePathname();
  const { data } = useSession();

  // Make sure we have permission to see this item
  if (role && (!data || data.user.role !== role)) {
    return null;
  }

  // Check if this is the current page
  const isCurrent = isPageCurrent(pathname, href);

  return (
    <Link
      unstyled
      href={href}
      className={styles.link}
      aria-current={isCurrent ? 'page' : undefined}
    >
      <span className={styles.text}>
        {icon}
        {label}
      </span>
    </Link>
  );
};
