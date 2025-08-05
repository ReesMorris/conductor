import { AuthWrapper } from '@/components/features/auth-wrapper';
import { Heading } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { page } from '@/libs/page';
import { VisuallyHidden } from '@/styled-system/jsx';
import { pageSchema } from './preferences.schema';
import { PreferencesSettingsSkeleton } from './preferences.skeleton';
import { RegionalSettings } from './regional-settings';

export const Page = page(pageSchema, () => {
  const { formatMessage } = useFormatMessage();
  return (
    <AuthWrapper skeleton={<PreferencesSettingsSkeleton />}>
      <VisuallyHidden>
        <Heading level={1}>{formatMessage('Preferences')}</Heading>
      </VisuallyHidden>

      <RegionalSettings />
    </AuthWrapper>
  );
});
