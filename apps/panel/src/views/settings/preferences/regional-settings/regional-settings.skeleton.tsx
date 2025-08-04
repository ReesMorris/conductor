import { FieldSkeleton } from '@/components/ui';
import { FormActionsSkeleton, SettingsGrid } from '../../components';

export const RegionalSettingsSkeleton = () => {
  return (
    <>
      <SettingsGrid>
        <FieldSkeleton labelWidth='70px' />
      </SettingsGrid>
      <FormActionsSkeleton />
    </>
  );
};
