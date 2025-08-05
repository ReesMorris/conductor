import { AuthWrapper } from '@/components/features/auth-wrapper';
import { Heading } from '@/components/ui';
import { formatMessageServer } from '@/i18n/format-message-server';
import { page } from '@/libs/page';
import { VisuallyHidden } from '@/styled-system/jsx';
import { ProjectSettings } from './project-settings';
import { pageSchema } from './railway.schema';
import { RailwaySettingsSkeleton } from './railway.skeleton';

export const Page = page(pageSchema, async () => {
  return (
    <AuthWrapper requiredRole='admin' skeleton={<RailwaySettingsSkeleton />}>
      <VisuallyHidden>
        <Heading level={1}>
          {await formatMessageServer('Railway Settings')}
        </Heading>
      </VisuallyHidden>

      <ProjectSettings />
    </AuthWrapper>
  );
});
