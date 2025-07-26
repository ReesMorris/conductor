'use client';

import { Button, Field, Form, Input } from '@/components/ui';

export const LoginForm: React.FC = () => {
  return (
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
  );
};
