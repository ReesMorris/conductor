import { useFormatMessage } from '@/i18n/format-message';
import { BanIcon } from 'lucide-react';
import { Alert } from '../alert';
import { Code } from '../code';
import type { PermissionRequiredProps } from './permission-required.types';

export const PermissionRequired: React.FC<PermissionRequiredProps> = ({
  requiredRole,
  requiredPermission
}) => {
  const { formatMessage } = useFormatMessage();

  return (
    <Alert icon={<BanIcon />}>
      {requiredRole &&
        formatMessage(
          'You need the role <code>{role}</code> to access this content.',
          {
            code: text => <Code>{text}</Code>,
            role: requiredRole
          }
        )}
      {requiredPermission &&
        formatMessage(
          'You need the permission <code>{permission}</code> to access this content.',
          {
            code: text => <Code>{text}</Code>,
            permission: requiredPermission
          }
        )}
    </Alert>
  );
};
