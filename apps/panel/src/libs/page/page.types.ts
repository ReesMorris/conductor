import type { Locale } from '@/constants';
import type { z } from 'zod';

/**
 * PageProps interface defines the properties available to a page component.
 * It includes locale, dynamic route parameters, and search parameters.
 */
export interface PageProps {
  /**
   * Represents the current locale/language of the page.
   */
  locale: Locale;

  /**
   * Promise that resolves to dynamic route parameters.
   * Contains the slug parameter extracted from the URL path.
   */
  params: Promise<{ slug: string }>;

  /**
   * Promise that resolves to URL search parameters.
   * Contains query string parameters as key-value pairs where values
   * can be a single string, array of strings, or undefined.
   */
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Page function type definition.
 */
export type PageFn = (
  props: PageProps
) => Promise<React.ReactNode> | React.ReactNode | null;

/**
 * Schema interface for defining page-level validation schemas.
 * Used to validate both URL parameters and search parameters for a page.
 */
export interface PageSchema<
  TParamsSchema extends z.ZodTypeAny = z.ZodTypeAny,
  TSearchParamsSchema extends z.ZodTypeAny = z.ZodTypeAny
> {
  /**
   * Zod schema for validating URL parameters
   */
  params: TParamsSchema;

  /**
   * Zod schema for validating search parameters
   */
  searchParams: TSearchParamsSchema;
}

/**
 * Props type for validated page components.
 * Replaces the async params and searchParams with their validated, synchronous versions.
 */
export type ValidatedPageProps<TSchema extends PageSchema> = Omit<
  PageProps,
  'params' | 'searchParams'
> & {
  params: z.output<TSchema['params']> & { locale: Locale };
  searchParams: z.output<TSchema['searchParams']>;
};
