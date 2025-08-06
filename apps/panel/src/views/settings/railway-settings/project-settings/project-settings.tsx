'use client';

import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import {
  FormActions,
  SettingsGrid,
  SettingsSection
} from '@/views/settings/components';
import { AccessTokenField } from './access-token-field';
import { ProjectIdField } from './project-id-field';
import { ProjectSettingsSkeleton } from './project-settings.skeleton';
import { ProjectSettingsForm } from './project-settings-form';

export const ProjectSettings: React.FC = () => {
  const { formatMessage } = useFormatMessage();

  // Load the project settings configuration
  const { data } = trpc.railway.getConfig.useQuery();

  if (!data) {
    return <ProjectSettingsSkeleton />;
  }

  return (
    <SettingsSection label={formatMessage('Railway Settings')}>
      <ProjectSettingsForm initialData={data}>
        <SettingsGrid>
          <AccessTokenField data={data} />
          <ProjectIdField data={data} />
        </SettingsGrid>
        <FormActions />
      </ProjectSettingsForm>
    </SettingsSection>
  );
};
