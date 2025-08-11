import type { User } from '@conductor/auth';

export interface SidebarSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The label for the sidebar section.
   */
  title: string;

  /**
   * The required user role to display this item.
   */
  userRole?: User['role'];
}
