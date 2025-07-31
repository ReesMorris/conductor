import { Avatar, DropdownMenu } from '@/components/ui';
import type { UserMenuTriggerProps } from './user-menu-trigger.types';

export const UserMenuTrigger: React.FC<UserMenuTriggerProps> = ({
  isOpen,
  profilePicture,
  name,
  ...props
}) => {
  return (
    <DropdownMenu.Trigger
      startElement={<Avatar size='xs' src={profilePicture} />}
      isOpen={isOpen}
      {...props}
    >
      {name}
    </DropdownMenu.Trigger>
  );
};
