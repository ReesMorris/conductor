import { RadioGroup } from 'radix-ui';
import type { RadioCardRootProps } from './radio-card-root.types';

export const RadioCardRoot: React.FC<RadioCardRootProps> = ({
  'aria-label': ariaLabel,
  children,
  ...props
}) => {
  return (
    <RadioGroup.Root {...props} aria-label={ariaLabel}>
      {children}
    </RadioGroup.Root>
  );
};
