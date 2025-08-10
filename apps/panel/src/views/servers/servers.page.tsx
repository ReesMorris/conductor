import { page } from '@/libs/page';
import { Client } from './client';
import { pageSchema } from './servers.schema';

export const Page = page(pageSchema, () => {
  return <Client />;
});
