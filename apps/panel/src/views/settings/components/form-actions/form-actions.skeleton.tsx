import { Skeleton } from '@/components/ui';
import { token } from '@/styled-system/tokens';
import { styles } from './form-actions.styles';

export const FormActionsSkeleton = () => {
  return (
    <div className={styles.actions}>
      <Skeleton width='72px' height={token('sizes.ui.sm')} />
      <Skeleton width='120px' height={token('sizes.ui.sm')} />
    </div>
  );
};
