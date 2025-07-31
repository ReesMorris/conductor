import { Avatar, Button } from '@/components/ui';
import { ChevronDown } from 'lucide-react';
import { styles } from './user-menu-trigger.styles';
import type { UserMenuTriggerProps } from './user-menu-trigger.types';

export const UserMenuTrigger: React.FC<UserMenuTriggerProps> = ({
  isOpen,
  profilePicture,
  name,
  ...props
}) => {
  return (
    <Button type='button' variant='outlined' {...props}>
      <Avatar size='xs' src={profilePicture} />
      <span>{name}</span>
      <div className={styles.chevron} data-open={isOpen || undefined}>
        <ChevronDown />
      </div>
    </Button>
  );
};
