import { Heading, Input } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Logo } from '@/components/ui/logo';
import { styles } from './content.styles';

export const Content = () => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <header className={styles.header}>
          <Logo size={80} className={styles.logo} />
          <Heading level={1}>Welcome Back</Heading>
        </header>

        <Form>
          <Field label='Email Address'>
            <Input placeholder='steve@minecraft.com' />
          </Field>

          <Field label='Password'>
            <Input type='password' placeholder='••••••••••' />
          </Field>

          <Button type='submit' variant='primary'>
            Sign In
          </Button>
        </Form>
      </div>
    </main>
  );
};
