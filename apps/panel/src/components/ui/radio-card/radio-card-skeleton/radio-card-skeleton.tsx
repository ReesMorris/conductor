import { token } from '@/styled-system/tokens';
import { Skeleton } from '../../skeleton';

export const RadioCardSkeleton: React.FC = () => {
  return <Skeleton width='full' height={token('sizes.ui.lg')} />;
};
