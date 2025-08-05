import { styles } from './auth-layout.styles';
import type { AuthLayoutProps } from './auth-layout.types';
import { AuthLayoutActions } from './auth-layout-actions';
import { AuthLayoutFooter } from './auth-layout-footer';
import { AuthLayoutHeader } from './auth-layout-header';

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  icon,
  showLogo = true,
  footer
}) => {
  return (
    <div className={styles.wrapper}>
      <AuthLayoutActions />
      <main>
        <div className={styles.content}>
          <AuthLayoutHeader
            title={title}
            icon={icon}
            subtitle={subtitle}
            showLogo={showLogo}
          />
          {children}
        </div>

        {footer && <AuthLayoutFooter>{footer}</AuthLayoutFooter>}
      </main>
    </div>
  );
};
