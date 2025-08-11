'use client';

import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import { FormActions, SettingsSection } from '@/views/settings/components';
import { RegistrationEnabled } from './registration-enabled';
import { WorkspaceSettingsSkeleton } from './workspace-settings.skeleton';
import { WorkspaceSettingsForm } from './workspace-settings-form';

export const WorkspaceSettings: React.FC = () => {
  const { formatMessage } = useFormatMessage();

  // Load the workspace settings configuration
  const { data } = trpc.workspace.getSettings.useQuery();
  if (!data) {
    return <WorkspaceSettingsSkeleton />;
  }

  return (
    <SettingsSection label={formatMessage('Workspace Settings')}>
      <WorkspaceSettingsForm initialData={data}>
        <RegistrationEnabled />
        <FormActions />
      </WorkspaceSettingsForm>
    </SettingsSection>
  );
};
