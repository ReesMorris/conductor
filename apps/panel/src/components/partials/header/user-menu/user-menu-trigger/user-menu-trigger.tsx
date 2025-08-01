import { Avatar, Button } from '@/components/ui';
import { styles } from './user-menu-trigger.styles';
import type { UserMenuTriggerProps } from './user-menu-trigger.types';

export const UserMenuTrigger: React.FC<UserMenuTriggerProps> = ({
  isOpen,
  profilePicture,
  name,
  ...props
}) => {
  return (
    <Button variant='ghost' {...props} className={styles.button}>
      <Avatar src={profilePicture} />
    </Button>
  );
};
