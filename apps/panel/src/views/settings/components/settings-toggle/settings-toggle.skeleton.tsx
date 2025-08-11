import { Skeleton, SwitchSkeleton } from '@/components/ui';
import { css } from '@/styled-system/css';
import { styles } from './settings-toggle.styles';

export const SettingsToggleSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <Skeleton
          width='140px'
          height='20px'
          className={css({ marginBlockEnd: '1' })}
        />
        <Skeleton width='220px' height='16px' />
      </div>
      <SwitchSkeleton />
    </div>
  );
};
