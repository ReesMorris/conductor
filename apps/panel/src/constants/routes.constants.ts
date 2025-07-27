type NoUrlParams = Record<string, never>;

type UrlParam = string | number;

export type RouteParams = {
  HOME: NoUrlParams;
  LOGIN: NoUrlParams;
  REGISTER: NoUrlParams;
  HEALTH_CHECK: NoUrlParams;
  _PLACEHOLDER: { name: UrlParam };
};

export const Routes: Record<keyof RouteParams, string> = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  HEALTH_CHECK: '/health',
  _PLACEHOLDER: '/:name' // Example placeholder route
} as const;
