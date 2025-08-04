import { FieldSkeleton, Skeleton } from '@/components/ui';
import { css } from '@/styled-system/css';
import { FormActionsSkeleton, SettingsGrid } from '../../components';

export const PersonalInformationSkeleton: React.FC = () => {
  return (
    <>
      {/* Title */}
      <Skeleton
        width='190px'
        height='28px'
        className={css({ marginBlockEnd: '4' })}
      />

      {/* Name Field Skeleton */}
      <SettingsGrid className={css({ paddingBlockStart: '0.5' })}>
        <FieldSkeleton labelWidth='70px' />
      </SettingsGrid>
      <FormActionsSkeleton />
    </>
  );
};
