import { Main } from '@/components/partials';
import { page } from '@/libs/page';
import { EmptyMessage } from './empty-message';
import { pageSchema } from './home.schema';

export const Page = page(pageSchema, () => {
  return (
    <Main>
      <EmptyMessage />
    </Main>
  );
});
