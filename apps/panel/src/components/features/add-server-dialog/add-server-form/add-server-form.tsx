import { Form } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type AddServerFormData,
  addServerFormSchema
} from './add-server-form.schema';
import type { AddServerFormProps } from './add-server-form.types';

export const AddServerForm: React.FC<AddServerFormProps> = ({
  children,
  ...props
}) => {
  const { formatMessage } = useFormatMessage();

  return (
    <Form<AddServerFormData>
      {...props}
      // onSubmit={handleSubmit}
      defaultValues={{
        gameType: '',
        serverName: '',
        domain: ''
      }}
      resolver={zodResolver(
        addServerFormSchema({
          gameTypeRequired: formatMessage('Game type is required'),
          serverNameRequired: formatMessage('Server name is required')
        })
      )}
    >
      {children}
    </Form>
  );
};
