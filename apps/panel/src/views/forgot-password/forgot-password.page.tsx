import 'server-only';

import { env } from '@/env';
import { route } from '@/utils/route';
import urlJoin from 'url-join';
import { ForgotPasswordForm } from './forgot-password-form';

export const Page = () => {
  return (
    <ForgotPasswordForm
      redirectUrl={urlJoin(env.FRONTEND_URL, route('RESET_PASSWORD'))}
    />
  );
};
