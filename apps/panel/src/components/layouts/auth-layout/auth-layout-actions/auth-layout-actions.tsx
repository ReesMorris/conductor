import { ThemeToggle } from '@/components/features/theme-toggle';
import { styles } from './auth-layout-actions.styles';

export const AuthLayoutActions: React.FC = () => {
  return (
    <div className={styles.actions}>
      <ThemeToggle />
    </div>
  );
};
