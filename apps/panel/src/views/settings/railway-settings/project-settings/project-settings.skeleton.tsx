import { FieldSkeleton, Skeleton } from '@/components/ui';
import { css } from '@/styled-system/css';
import { FormActionsSkeleton, SettingsGrid } from '../../components';

export const ProjectSettingsSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton
        width='142px'
        height='30px'
        className={css({ marginBlockEnd: '4' })}
      />
      <SettingsGrid>
        <FieldSkeleton labelWidth='90px' helpTextWidth='250px' />
      </SettingsGrid>
      <FormActionsSkeleton />
    </>
  );
};
