import { Skeleton } from '@/components/ui';
import { css } from '@/styled-system/css';
import { styles } from './active-sessions.styles';

export const ActiveSessionsSkeleton = () => {
  return (
    <>
      <Skeleton
        width='145px'
        height='28px'
        className={css({ marginBlockEnd: '4' })}
      />
      <div className={styles.sessionList}>
        <Skeleton width='100%' height='80px' />
      </div>
    </>
  );
};
