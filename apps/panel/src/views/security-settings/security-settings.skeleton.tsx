'use client';

import { Skeleton } from '@/components/ui';
import { css } from '@/styled-system/css';

export const SecuritySettingsSkeleton: React.FC = () => {
  return (
    <>
      {/* Email Settings Section Skeleton */}
      <div>
        {/* Title */}
        <Skeleton width='130px' height='28px' />

        {/* Email Field Skeleton */}
        <div
          className={css({
            display: 'grid',
            gap: '12',
            marginBlockStart: '6',
            gridTemplateColumns: 'repeat(2, 1fr)'
          })}
        >
          <div>
            <Skeleton width='95px' height='16px' />
            <Skeleton
              width='100%'
              height='40px'
              className={css({ marginBlockStart: '2' })}
            />
            <Skeleton
              width='113px'
              height='36px'
              className={css({ marginBlockStart: '2' })}
            />
          </div>
        </div>
      </div>
    </>
  );
};
