import { Tooltip as RadixTooltip } from 'radix-ui';
import { styles } from './tooltip.styles';
import type { TooltipProps } from './tooltip.types';

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  disabled = false,
  triggerAsChild = false,
  side = 'top',
  align = 'center',
  sideOffset = 8,
  children,
  ...props
}) => {
  // If disabled, render only the trigger without the tooltip
  if (disabled) {
    return children;
  }

  return (
    <RadixTooltip.Root {...props}>
      <RadixTooltip.Trigger asChild={triggerAsChild}>
        {children}
      </RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          className={styles.content}
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          {content}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
};
