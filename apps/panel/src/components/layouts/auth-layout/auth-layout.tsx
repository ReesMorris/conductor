import { LanguageSelector } from '@/components/features/language-selector';
import { Heading } from '@/components/ui';
import { VisuallyHidden } from '@/styled-system/jsx';
import { LanguagesIcon } from 'lucide-react';
import { styles } from './auth-layout.styles';

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

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
        <LanguageSelector
          triggerAsChild
          trigger={
            <button type='button' className={styles.actionRowButton}>
              <LanguagesIcon />
            </button>
          }
        />
      </div>
    </main>
  );
};
