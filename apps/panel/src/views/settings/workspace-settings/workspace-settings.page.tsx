import { AuthWrapper } from '@/components/features/auth-wrapper';
import { Heading } from '@/components/ui';
import { formatMessageServer } from '@/i18n/format-message-server';
import { page } from '@/libs/page';
import { VisuallyHidden } from '@/styled-system/jsx';
import { WorkspaceSettings } from './workspace-settings';
import { pageSchema } from './workspace-settings.schema';
import { WorkspaceSettingsSkeleton } from './workspace-settings.skeleton';

export const Page = page(pageSchema, async () => {
  return (
    <AuthWrapper requiredRole='admin' skeleton={<WorkspaceSettingsSkeleton />}>
      <VisuallyHidden>
        <Heading level={1}>
          {await formatMessageServer('Workspace Settings')}
        </Heading>
      </VisuallyHidden>

      <WorkspaceSettings />
    </AuthWrapper>
  );
});
