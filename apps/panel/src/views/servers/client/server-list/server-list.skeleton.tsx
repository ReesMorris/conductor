import { Skeleton } from '@/components/ui';
import { token } from '@/styled-system/tokens';
import { styles } from './server-list.styles';

export const ServerListSkeleton: React.FC = () => {
  return (
    <>
      <div className={styles.header}>
        <Skeleton width='150px' height='32px' />
        <Skeleton width='132px' height={token('sizes.ui.md')} />
      </div>
      <div className={styles.grid}>
        {Array.from({ length: 2 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a static array
          <Skeleton key={index} width='100%' height='391px' />
        ))}
      </div>
    </>
  );
};
