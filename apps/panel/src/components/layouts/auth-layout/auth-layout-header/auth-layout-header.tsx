import { Heading, Logo } from '@/components/ui';
import { styles } from './auth-layout-header.styles';
import type { AuthLayoutHeaderProps } from './auth-layout-header.types';

export const AuthLayoutHeader: React.FC<AuthLayoutHeaderProps> = ({
  title,
  subtitle
}) => {
  return (
    <header className={styles.header}>
      <Logo size={64} className={styles.logo} />
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
