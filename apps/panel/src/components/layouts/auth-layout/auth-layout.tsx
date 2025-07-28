import { LanguageSelector } from '@/components/features/language-selector';
import { ThemeToggle } from '@/components/features/theme-toggle';
import { Heading } from '@/components/ui';
import { VisuallyHidden } from '@/styled-system/jsx';
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
      <header className={styles.header}>
        <Heading level={1}>{title}</Heading>
        {subtitle && (
          <VisuallyHidden>
            <Heading level={2}>{subtitle}</Heading>
          </VisuallyHidden>
        )}
      </header>
      <div className={styles.content}>
        {children}
        {footer && (
          <div className={styles.footer}>
            <p className={styles.footerText}>{footer}</p>
          </div>
        )}
      </div>
      <div className={styles.actionRow}>
        <ThemeToggle className={styles.actionRowButton} />
        <LanguageSelector triggerClassName={styles.actionRowButton} />
      </div>
    </main>
  );
};
