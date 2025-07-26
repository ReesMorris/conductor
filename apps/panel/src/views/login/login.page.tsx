import { Heading } from '@/components/ui';
import { VisuallyHidden } from '@/styled-system/jsx';
import { styles } from './login.styles';
import { LoginForm } from './login-form';

export const Page = () => {
  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <Heading level={1}>Welcome Back</Heading>
        <VisuallyHidden>
          <Heading level={2}>Please sign in to continue</Heading>
        </VisuallyHidden>
      </header>
      <div className={styles.content}>
        <LoginForm />
      </div>
    </main>
  );
};
