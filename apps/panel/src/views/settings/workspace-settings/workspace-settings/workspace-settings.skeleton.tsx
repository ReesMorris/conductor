import { Skeleton } from '@/components/ui';
import { css } from '@/styled-system/css';
import { FormActionsSkeleton, SettingsToggleSkeleton } from '../../components';

export const WorkspaceSettingsSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton
        width='183px'
        height='30px'
        className={css({ marginBlockEnd: '4' })}
      />
      <SettingsToggleSkeleton />
      <FormActionsSkeleton />
    </>
  );
};
