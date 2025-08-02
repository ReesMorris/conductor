import type { Tooltip } from 'radix-ui';

export interface TooltipProps extends Omit<Tooltip.TooltipProps, 'children'> {
  /**
   * The content to display in the tooltip
   */
  content: React.ReactNode;

  /**
   * The trigger element (children of the component)
   */
  children: React.ReactNode;

  /**
   * Whether the trigger should use Radix UI's asChild pattern
   * @default false
   */
  triggerAsChild?: boolean;

  /**
   * The preferred side of the trigger to render against
   * @default 'top'
   */
  side?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * The preferred alignment against the trigger
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';

  /**
   * The distance in pixels from the trigger
   * @default 8
   */
  sideOffset?: number;

  /**
   * If true, the tooltip will not appear and only the children will be rendered
   * @default false
   */
  disabled?: boolean;
}
