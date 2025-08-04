'use client';

import { Separator } from '@/components/ui';
import { ActiveSessionsSkeleton } from './active-sessions';
import { EmailSettingsSkeleton } from './email-settings/email-settings.skeleton';

export const SecuritySettingsSkeleton: React.FC = () => {
  return (
    <>
      <EmailSettingsSkeleton />
      <Separator />
      <ActiveSessionsSkeleton />
    </>
  );
};
