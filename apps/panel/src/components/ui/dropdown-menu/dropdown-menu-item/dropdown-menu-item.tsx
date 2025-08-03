import { cx } from '@/styled-system/css';
import { CheckIcon } from 'lucide-react';
import { DropdownMenu as RadixDropdownMenu } from 'radix-ui';
import { Link } from '../../link';
import { styles } from './dropdown-menu-item.styles';
import type { DropdownMenuItemProps } from './dropdown-menu-item.types';

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  href: hrefProp,
  icon,
  className,
  isLoading,
  'aria-current': ariaCurrent,
  ...props
}) => {
  // If the item is disabled, don't render as a link
  let href = hrefProp;
  if (props.disabled) {
    href = undefined;
  }

  // Determine whether the item is disabled
  const disabled = props.disabled || isLoading;

  return (
    <RadixDropdownMenu.Item
      {...props}
      asChild
      aria-current={ariaCurrent}
      className={cx('group', styles.item, className)}
      disabled={disabled}
      data-loading={isLoading || undefined}
    >
      <Link unstyled href={href} fallbackElement='button'>
        <span className={styles.content}>{children}</span>
        {icon && !ariaCurrent && <span className={styles.icon}>{icon}</span>}
        {ariaCurrent && (
          <span className={styles.icon} data-current>
            <CheckIcon />
          </span>
        )}
      </Link>
    </RadixDropdownMenu.Item>
  );
};
