type NoUrlParams = Record<string, never>;

type UrlParam = string | number;

export type RouteParams = {
  HOME: NoUrlParams;
  LOGIN: NoUrlParams;
  REGISTER: NoUrlParams;
  FORGOT_PASSWORD: NoUrlParams;
  ACCOUNT: NoUrlParams;
  HEALTH_CHECK: NoUrlParams;
  SERVERS: NoUrlParams;
  SERVER_SETTINGS: NoUrlParams;
  _PLACEHOLDER: { name: UrlParam };
};

export const Routes: Record<keyof RouteParams, string> = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  ACCOUNT: '/account',
  HEALTH_CHECK: '/health',
  SERVERS: '/', // this is the first dashboard route
  SERVER_SETTINGS: '/settings',
  _PLACEHOLDER: '/:name' // Example placeholder route
} as const;
