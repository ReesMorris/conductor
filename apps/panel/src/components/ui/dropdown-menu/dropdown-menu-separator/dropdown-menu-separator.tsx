import { cx } from '@/styled-system/css';
import { DropdownMenu as RadixDropdownMenu } from 'radix-ui';
import { styles } from './dropdown-menu-separator.styles';
import type { DropdownMenuSeparatorProps } from './dropdown-menu-separator.types';

export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({
  className,
  ...props
}) => {
  return (
    <RadixDropdownMenu.Separator
      className={cx(styles.separator, className)}
      {...props}
    />
  );
};
