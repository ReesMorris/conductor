import { Avatar, Button } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { styles } from './user-menu-trigger.styles';
import type { UserMenuTriggerProps } from './user-menu-trigger.types';

export const UserMenuTrigger: React.FC<UserMenuTriggerProps> = ({
  isOpen,
  profilePicture,
  name,
  ...props
}) => {
  const { formatMessage } = useFormatMessage();

  return (
    <Button
      variant='ghost'
      {...props}
      className={styles.button}
      aria-label={formatMessage('User menu')}
    >
      <Avatar src={profilePicture} alt={name ?? ''} />
    </Button>
  );
};
