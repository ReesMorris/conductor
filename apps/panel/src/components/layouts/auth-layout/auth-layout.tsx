import { styles } from './auth-layout.styles';
import type { AuthLayoutProps } from './auth-layout.types';
import { AuthLayoutActions } from './auth-layout-actions';
import { AuthLayoutFooter } from './auth-layout-footer';
import { AuthLayoutHeader } from './auth-layout-header';

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  footer
}) => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <AuthLayoutHeader title={title} subtitle={subtitle} />
        {children}
      </div>

      {footer && <AuthLayoutFooter>{footer}</AuthLayoutFooter>}

      <AuthLayoutActions />
    </main>
  );
};
