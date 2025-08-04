import { token } from '@/styled-system/tokens';
import { Skeleton } from '../skeleton';
import { styles } from './field.styles';
import type { FieldSkeletonProps } from './field.types';

export const FieldSkeleton: React.FC<FieldSkeletonProps> = ({
  labelWidth = '30%',
  inputWidth = '100%',
  inputHeight = token('sizes.ui.md'),
  labelSuffixWidth
}) => {
  return (
    <div className={styles.field}>
      <div className={styles.fieldWrapper}>
        <div className={styles.labelContainer}>
          <Skeleton width={labelWidth} height='24px' />
        </div>
        <div className={styles.inputWrapper}>
          <Skeleton width={inputWidth} height={inputHeight} />
        </div>
        {labelSuffixWidth && (
          <div className={styles.labelSuffix}>
            <Skeleton width={labelSuffixWidth} height='24px' />
          </div>
        )}
      </div>
      <div className={styles.fieldDescription} />
    </div>
  );
};
