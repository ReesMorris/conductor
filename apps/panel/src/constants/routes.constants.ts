type NoUrlParams = Record<string, never>;

type UrlParam = string | number;

export type RouteParams = {
  HOME: NoUrlParams;
  LOGIN: NoUrlParams;
  _PLACEHOLDER: { name: UrlParam };
};

export const Routes: Record<keyof RouteParams, string> = {
  HOME: '/',
  LOGIN: '/login',
  _PLACEHOLDER: '/:name' // Example placeholder route
} as const;
