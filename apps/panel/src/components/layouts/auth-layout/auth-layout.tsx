import { Heading, Logo } from '@/components/ui';
import { styles } from './auth-layout.styles';
import type { AuthLayoutProps } from './auth-layout.types';

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  footer
}) => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <header className={styles.header}>
          <Logo size={64} className={styles.logo} />
          <Heading unstyled level={1} className={styles.title}>
            {title}
          </Heading>
          <Heading unstyled level={2} className={styles.subtitle}>
            {subtitle}
          </Heading>
        </header>
        {children}
      </div>

      {footer && (
        <div className={styles.footer}>
          <div className={styles.footerText}>{footer}</div>
        </div>
      )}

      {/* <div className={styles.actionRow}>
        <ThemeToggle className={styles.actionRowButton} />
        <LanguageSelector triggerClassName={styles.actionRowButton} />
      </div> */}
    </main>
  );
};
