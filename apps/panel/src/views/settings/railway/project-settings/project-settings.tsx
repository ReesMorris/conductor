import { useFormatMessage } from '@/i18n/format-message';
import {
  FormActions,
  SettingsGrid,
  SettingsSection
} from '@/views/settings/components';
import { ProjectSettingsForm } from './project-settings-form';
import { ProjectTokenField } from './project-token-field';

export const ProjectSettings: React.FC = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <SettingsSection label={formatMessage('Project Settings')}>
      <ProjectSettingsForm>
        <SettingsGrid>
          <ProjectTokenField />
        </SettingsGrid>
        <FormActions />
      </ProjectSettingsForm>
    </SettingsSection>
  );
};
