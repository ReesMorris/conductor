import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/constants';
import { z } from 'zod';
import type { PageProps, PageSchema, ValidatedPageProps } from './page.types';

/**
 * Creates a Next.js page component with runtime validation of params and searchParams.
 *
 * This higher-order function wraps a page component to provide automatic validation
 * of URL parameters and search parameters using Zod schemas. It ensures type safety
 * at runtime and provides properly typed props to the wrapped component.
 */
export const page = <TSchema extends PageSchema>(
  schema: TSchema,
  component: (props: ValidatedPageProps<TSchema>) => React.ReactNode
  // biome-ignore lint/suspicious/noExplicitAny: Bypasses Next.js type limitations
): ((props: any) => Promise<React.ReactNode>) => {
  return async (props: PageProps) => {
    // Await both promises
    const [params, searchParams] = await Promise.all([
      props.params,
      props.searchParams
    ]);

    // Create a combined schema
    const combinedSchema = z.object({
      params: schema.params.and(
        z.object({
          locale: z.enum(LOCALES).catch(DEFAULT_LOCALE)
        })
      ),
      searchParams: schema.searchParams
    });

    // Validate the combined data
    const validated = combinedSchema.safeParse({ params, searchParams });
    if (!validated.success) {
      throw new Error(`Invalid page data: ${validated.error.message}`);
    }

    // Call the component with validated props
    return component({
      ...props,
      params: validated.data.params as z.output<TSchema['params']> & {
        locale: Locale;
      },
      searchParams: validated.data.searchParams as z.output<
        TSchema['searchParams']
      >
    });
  };
};
