import { FieldSkeleton, Skeleton } from '@/components/ui';
import { css } from '@/styled-system/css';
import { FormActionsSkeleton, SettingsGrid } from '../../components';

export const ProjectSettingsSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton
        width='155px'
        height='30px'
        className={css({ marginBlockEnd: '4' })}
      />
      <SettingsGrid>
        <FieldSkeleton labelWidth='70px' />
      </SettingsGrid>
      <FormActionsSkeleton />
    </>
  );
};
