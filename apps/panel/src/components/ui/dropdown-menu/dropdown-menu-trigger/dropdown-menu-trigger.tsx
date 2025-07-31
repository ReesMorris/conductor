import { ChevronDownIcon } from 'lucide-react';
import { Button } from '../../button';
import { styles } from './dropdown-menu-trigger.styles';
import type { DropdownMenuTriggerProps } from './dropdown-menu-trigger.types';

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  startElement,
  isOpen,
  showChevron = true,
  children,
  ...props
}) => {
  return (
    <Button type='button' variant='outlined' {...props}>
      <div className={styles.content}>
        {startElement}
        {children}
        {showChevron && (
          <div className={styles.chevron} data-open={isOpen || undefined}>
            <ChevronDownIcon />
          </div>
        )}
      </div>
    </Button>
  );
};
