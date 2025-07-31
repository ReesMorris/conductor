import { Heading } from '@/components/ui';
import { styles } from './sidebar-section.styles';
import type { SidebarSectionProps } from './sidebar-section.types';

export const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  className,
  children,
  ...props
}) => {
  return (
    <div className={styles.container} {...props}>
      <Heading unstyled level={2} className={styles.title}>
        {title}
      </Heading>

      <div className={styles.content}>{children}</div>
    </div>
  );
};
