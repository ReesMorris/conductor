import { Skeleton } from '@/components/ui';
import { css } from '@/styled-system/css';
import { RegionalSettingsSkeleton } from './regional-settings';

export const PreferencesSettingsSkeleton = () => {
  return (
    <>
      {/* Section title */}
      <Skeleton
        width='155px'
        height='30px'
        className={css({ marginBlockEnd: '4' })}
      />

      <RegionalSettingsSkeleton />
    </>
  );
};
