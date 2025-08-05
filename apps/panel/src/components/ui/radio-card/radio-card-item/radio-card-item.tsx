import { cx } from '@/styled-system/css';
import { RadioGroup } from 'radix-ui';
import { styles } from './radio-card-item.styles';
import type { RadioCardItemProps } from './radio-card-item.types';

export const RadioCardItem: React.FC<RadioCardItemProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <RadioGroup.Item {...props} className={cx('group', styles.item, className)}>
      <div className={styles.content}>{children}</div>
      <div className={styles.indicator}>
        <div className={styles.indicatorIcon} />
      </div>
    </RadioGroup.Item>
  );
};
