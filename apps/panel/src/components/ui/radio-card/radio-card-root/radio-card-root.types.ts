import type { RadioGroup } from 'radix-ui';

export interface RadioCardRootProps extends RadioGroup.RadioGroupProps {
  /**
   * Accessibility label for the radio group.
   */
  'aria-label': string;
}
