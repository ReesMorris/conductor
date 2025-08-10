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
        connectionType: 'railway',
        domain: '',
        proxyPort: 25565
      }}
      resolver={zodResolver(
        addServerFormSchema({
          gameTypeRequired: formatMessage('Game type is required'),
          serverNameRequired: formatMessage('Server name is required'),
          domainRequired: formatMessage(
            'Domain is required for custom domain connection'
          ),
          proxyPortRequired: formatMessage('Port is required'),
          proxyPortInvalid: formatMessage(
            'Port must be a valid number between 1 and 65535'
          )
        })
      )}
    >
      {children}
    </Form>
  );
};
