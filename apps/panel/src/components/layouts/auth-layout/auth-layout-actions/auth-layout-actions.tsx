import { LanguageSelector } from '@/components/features/language-selector';
import { ThemeToggle } from '@/components/features/theme-toggle';
import { Wrapper } from '@/components/partials';
import { styles } from './auth-layout-actions.styles';

export const AuthLayoutActions: React.FC = () => {
  return (
    <Wrapper>
      <header className={styles.actions}>
        <LanguageSelector />
        <ThemeToggle />
      </header>
    </Wrapper>
  );
};
