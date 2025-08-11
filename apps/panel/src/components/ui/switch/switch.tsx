import { cx } from '@/styled-system/css';
import { Switch as RadixSwitch } from 'radix-ui';
import { styles } from './switch.styles';
import type { SwitchProps } from './switch.types';

export const Switch: React.FC<SwitchProps> = ({ className, ...props }) => {
  return (
    <RadixSwitch.Root {...props} className={cx(styles.root, className)}>
      <RadixSwitch.Thumb className={styles.thumb} />
    </RadixSwitch.Root>
  );
};
