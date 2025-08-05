'use client';

import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import {
  FormActions,
  SettingsGrid,
  SettingsSection
} from '@/views/settings/components';
import { ProjectSettingsSkeleton } from './project-settings.skeleton';
import { ProjectSettingsForm } from './project-settings-form';
import { ProjectTokenField } from './project-token-field';

export const ProjectSettings: React.FC = () => {
  const { formatMessage } = useFormatMessage();

  // Load the project settings configuration
  const { data } = trpc.railway.getConfig.useQuery();
  if (!data) {
    return <ProjectSettingsSkeleton />;
  }

  return (
    <SettingsSection label={formatMessage('Project Settings')}>
      <ProjectSettingsForm initialData={data}>
        <SettingsGrid>
          <ProjectTokenField data={data} />
        </SettingsGrid>
        <FormActions />
      </ProjectSettingsForm>
    </SettingsSection>
  );
};
