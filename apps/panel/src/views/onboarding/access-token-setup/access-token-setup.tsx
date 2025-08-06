'use client';

import { AuthLayout } from '@/components/layouts';
import { Button, Form, type FormRef, type HandleSubmit } from '@/components/ui';
import { useToast } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { isTRPCClientError } from '@trpc/client';
import { RefreshCwIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { AccessTokenField } from './access-token-field';
import { AccessTokenGuide } from './access-token-guide';
import {
  type AccessTokenSetupFormData,
  accessTokenSetupSchema
} from './access-token-setup.schema';
import { styles } from './access-token-setup.styles';

export const AccessTokenSetup: React.FC = () => {
  const formRef = useRef<FormRef<AccessTokenSetupFormData>>(null);
  const { formatMessage } = useFormatMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const mutation = trpc.onboarding.setAccessToken.useMutation();

  const handleSubmit: HandleSubmit<AccessTokenSetupFormData> = async ({
    data
  }) => {
    try {
      if (isSubmitting) {
        return;
      }

      // Prevent multiple submissions
      setIsSubmitting(true);

      // Call the mutation to verify the access token
      await mutation.mutateAsync({
        accessToken: data.accessToken
      });

      // If successful, reload the page to proceed to the next step
      window.location.reload();
    } catch (error) {
      let reason = '';
      if (isTRPCClientError(error)) {
        reason = error.message;
      }

      console.error('Error verifying access token:', error);
      toast.error(formatMessage('Failed to verify access token'), reason);
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title={formatMessage('Connect to Railway')}
      subtitle={formatMessage('We need your Railway access token to continue')}
    >
      <AccessTokenGuide />

      <Form<AccessTokenSetupFormData>
        ref={formRef}
        mode='onSubmit'
        defaultValues={{
          accessToken: ''
        }}
        resolver={zodResolver(
          accessTokenSetupSchema({
            invalidAccessToken: formatMessage(
              'Please enter a valid Railway access token.'
            )
          })
        )}
        onSubmit={handleSubmit}
      >
        <AccessTokenField />

        <Button
          type='submit'
          isLoading={isSubmitting}
          className={styles.submitButton}
        >
          <RefreshCwIcon />
          {formatMessage('Verify Access Token')}
        </Button>
      </Form>

      <p className={styles.infoText}>
        {formatMessage(
          'Your access token is needed to deploy and manage game templates in your project. It will be fully encrypted and stored securely in your own database.'
        )}
      </p>
    </AuthLayout>
  );
};
