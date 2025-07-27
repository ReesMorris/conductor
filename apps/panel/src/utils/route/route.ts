import { type RouteParams, Routes } from '@/constants';

/**
 * Function to generate a route string based on the provided path and parameters.
 *
 * @param path - The path for which the route is to be generated.
 * @param params - Optional parameters to be included in the route.
 * @returns The generated route string.
 */
export const route = <T extends keyof typeof Routes>(
  path: T,
  params?: RouteParams[T]
): string => {
  let route = Routes[path];

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (typeof value !== 'string' && typeof value !== 'number') {
        continue;
      }

      route = route.replace(`:${key}`, value.toString());
    }
  }

  return route;
};
