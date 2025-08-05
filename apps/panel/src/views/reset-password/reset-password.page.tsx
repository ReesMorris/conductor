import 'server-only';

import { redirect } from '@/i18n/navigation';
import { page } from '@/libs/page';
import { route } from '@/utils/route';
import { pageSchema } from './reset-password.schema';
import { ResetPasswordForm } from './reset-password-form';

export const Page = page(pageSchema, ({ params, searchParams }) => {
  const { locale } = params;
  const { token, error } = searchParams;

  // If there is no token (and no error), redirect to the forgot password page
  if (!token && !error) {
    return redirect({
      href: route('FORGOT_PASSWORD'),
      locale
    });
  }

  return <ResetPasswordForm token={token} error={error} />;
});
