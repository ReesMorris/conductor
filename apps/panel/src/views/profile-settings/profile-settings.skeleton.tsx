'use client';

import { Separator, Skeleton } from '@/components/ui';
import { css } from '@/styled-system/css';

export const ProfileSettingsSkeleton: React.FC = () => {
  return (
    <>
      {/* Profile Photo Section Skeleton */}
      <div>
        {/* Title */}
        <Skeleton width='120px' height='28px' />

        {/* Avatar row */}
        <div
          className={css({ display: 'flex', gap: '6', alignItems: 'center' })}
        >
          {/* Avatar skeleton */}
          <Skeleton
            width='80px'
            height='80px'
            shape='circle'
            className={css({ marginBlockStart: '5' })}
          />

          {/* Content */}
          <div className={css({ flex: '1', marginBlockStart: '6' })}>
            {/* Label */}
            <Skeleton
              width='130px'
              height='16px'
              className={css({ marginBlockEnd: '1' })}
            />
            {/* Help text */}
            <Skeleton
              width='175px'
              height='14px'
              className={css({ marginBlockEnd: '3' })}
            />

            {/* Buttons */}
            <div className={css({ display: 'flex', gap: '2' })}>
              <Skeleton width='152px' height='40px' />
              <Skeleton width='40px' height='40px' />
            </div>
          </div>
        </div>
      </div>

      <Separator />
    </>
  );
};
