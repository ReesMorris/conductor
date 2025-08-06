import { api } from '@/libs/api';
import { page } from '@/libs/page';
import { route } from '@/utils/route';
import { redirect } from 'next/navigation';
import { AccessTokenSetup } from './access-token-setup';
import { pageSchema } from './onboarding.schema';
import { UserSetup } from './user-setup';

export const Page = page(pageSchema, async () => {
  // Fetch the onboarding stage to determine which step to show
  const status = await api.onboarding.getOnboardingStatus.query();

  // If onboarding is already complete, redirect to home
  if (status === 'COMPLETE') {
    redirect(route('HOME'));
  }

  // Determine the current step based on the onboarding status
  switch (status) {
    case 'NO_USERS':
      return <UserSetup />;
    case 'NO_ACCESS_TOKEN':
      return <AccessTokenSetup />;
    default:
      // If no valid status, redirect to home
      redirect(route('HOME'));
  }
});
