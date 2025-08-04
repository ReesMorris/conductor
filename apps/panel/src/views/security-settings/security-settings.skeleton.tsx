'use client';

import { Separator, Skeleton } from '@/components/ui';
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
            <div className={css({ display: 'flex', gap: '2' })}>
              <Skeleton
                width='72px'
                height='36px'
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
      </div>

      <Separator />

      {/* Active Sessions Section Skeleton */}
      <div>
        {/* Title */}
        <Skeleton width='145px' height='28px' />
        {/* Session List Skeleton */}
        <div
          className={css({
            marginBlockStart: '4',
            display: 'flex',
            flexDirection: 'column',
            gap: '2'
          })}
        >
          <Skeleton width='100%' height='85px' />
          <Skeleton width='100%' height='85px' />
        </div>
      </div>
    </>
  );
};
