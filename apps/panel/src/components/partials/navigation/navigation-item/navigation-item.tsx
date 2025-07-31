'use client';

import { Link } from '@/components/ui';
import { useSession } from '@/hooks';
import { usePathname } from '@/i18n/navigation';
import { styles } from './navigation-item.styles';
import type { NavigationItemProps } from './navigation-item.types';

export const NavigationItem: React.FC<NavigationItemProps> = ({
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

  // Check if the current path matches the href
  const isCurrent = pathname === href;

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
