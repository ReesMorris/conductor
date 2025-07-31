import { styles } from './auth-layout-footer.styles';
import type { AuthLayoutFooterProps } from './auth-layout-footer.types';

export const AuthLayoutFooter: React.FC<AuthLayoutFooterProps> = ({
  children
}) => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerText}>{children}</div>
    </div>
  );
};
