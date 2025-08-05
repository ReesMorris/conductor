import 'server-only';

import { env } from '@/env';
import { page } from '@/libs/page';
import { route } from '@/utils/route';
import urlJoin from 'url-join';
import { pageSchema } from './forgot-password.schema';
import { ForgotPasswordForm } from './forgot-password-form';

export const Page = page(pageSchema, () => {
  return (
    <ForgotPasswordForm
      redirectUrl={urlJoin(env.FRONTEND_URL, route('RESET_PASSWORD'))}
    />
  );
});
