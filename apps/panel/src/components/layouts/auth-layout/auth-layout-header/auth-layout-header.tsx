import { Heading, Logo } from '@/components/ui';
import { styles } from './auth-layout-header.styles';
import type { AuthLayoutHeaderProps } from './auth-layout-header.types';

export const AuthLayoutHeader: React.FC<AuthLayoutHeaderProps> = ({
  title,
  subtitle,
  icon,
  showLogo = true
}) => {
  return (
    <header className={styles.header}>
      {showLogo && !icon && <Logo size={64} className={styles.logo} />}
      {icon && <div className={styles.logo}>{icon}</div>}
      <Heading unstyled level={1} className={styles.title}>
        {title}
      </Heading>
      {subtitle && (
        <Heading unstyled level={2} className={styles.subtitle}>
          {subtitle}
        </Heading>
      )}
    </header>
  );
};
