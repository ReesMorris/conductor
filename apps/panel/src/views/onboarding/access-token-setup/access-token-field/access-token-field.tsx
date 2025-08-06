import { Field, Input, InputGroup } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { KeySquareIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { AccessTokenSetupFormData } from '../access-token-setup.schema';

export const AccessTokenField: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const { register, formState } = useFormContext<AccessTokenSetupFormData>();

  return (
    <Field
      label={formatMessage('Your Access Token')}
      errorMessage={formState.errors.accessToken?.message}
    >
      <InputGroup startElement={<KeySquareIcon />}>
        <Input
          {...register('accessToken')}
          placeholder='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
          autoComplete='off'
        />
      </InputGroup>
    </Field>
  );
};
