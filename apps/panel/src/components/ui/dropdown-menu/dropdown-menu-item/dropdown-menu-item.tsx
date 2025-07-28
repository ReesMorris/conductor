import { cx } from '@/styled-system/css';
import { DropdownMenu as RadixDropdownMenu } from 'radix-ui';
import { Link } from '../../link';
import { styles } from './dropdown-menu-item.styles';
import type { DropdownMenuItemProps } from './dropdown-menu-item.types';

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  href,
  icon,
  className,
  ...props
}) => {
  return (
    <RadixDropdownMenu.Item
      {...props}
      asChild
      className={cx(styles.item, className)}
    >
      <Link unstyled href={href} fallbackElement='button'>
        <span className={styles.content}>{children}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </Link>
    </RadixDropdownMenu.Item>
  );
};
