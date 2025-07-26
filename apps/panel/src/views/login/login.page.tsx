import { Heading, Logo } from '@/components/ui';
import { styles } from './login.styles';
import { LoginForm } from './login-form';

export const Page = () => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <header className={styles.header}>
          <Logo size={80} className={styles.logo} />
          <Heading level={1}>Welcome Back</Heading>
        </header>

        <LoginForm />
      </div>
    </main>
  );
};
