export interface UserMenuTriggerProps {
  /**
   * Whether the menu is open
   */
  isOpen: boolean;

  /**
   * URL of the user's profile picture
   */
  profilePicture?: string | null;

  /**
   * Name of the user
   */
  name?: string | null;
}
