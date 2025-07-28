import { cx } from '@/styled-system/css';
import { DropdownMenu as RadixDropdownMenu } from 'radix-ui';
import { styles } from './dropdown-menu-root.styles';
import type { DropdownMenuRootProps } from './dropdown-menu-root.types';

export const DropdownMenuRoot: React.FC<DropdownMenuRootProps> = ({
  trigger,
  triggerAsChild = false,
  children,
  align = 'start',
  side = 'bottom',
  sideOffset = 4,
  className,
  ...props
}) => {
  return (
    <RadixDropdownMenu.Root {...props}>
      <RadixDropdownMenu.Trigger
        asChild={triggerAsChild}
        className={styles.trigger}
      >
        {trigger}
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          align={align}
          side={side}
          sideOffset={sideOffset}
          className={cx(styles.root(), className)}
        >
          {children}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};
