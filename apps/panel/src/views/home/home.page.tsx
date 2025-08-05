import { Main } from '@/components/partials';
import { page } from '@/libs/page';
import { pageSchema } from './home.schema';

export const Page = page(pageSchema, () => {
  return <Main>home page</Main>;
});
