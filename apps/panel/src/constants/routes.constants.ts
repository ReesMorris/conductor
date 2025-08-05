type NoUrlParams = Record<string, never>;

type UrlParam = string | number;

export type RouteParams = {
  HOME: NoUrlParams;
  LOGIN: NoUrlParams;
  REGISTER: NoUrlParams;
  FORGOT_PASSWORD: NoUrlParams;
  RESET_PASSWORD: NoUrlParams;
  RESET_PASSWORD_TOKEN: { token: UrlParam };
  HEALTH_CHECK: NoUrlParams;
  SERVERS: NoUrlParams;
  USER_PROFILE_SETTINGS: NoUrlParams;
  USER_PREFERENCES_SETTINGS: NoUrlParams;
  USER_SECURITY_SETTINGS: NoUrlParams;
  WORKSPACE_GENERAL_SETTINGS: NoUrlParams;
  WORKSPACE_USERS_SETTINGS: NoUrlParams;
  WORKSPACE_RAILWAY_SETTINGS: NoUrlParams;
};

export const Routes: Record<keyof RouteParams, string> = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  RESET_PASSWORD_TOKEN: '/reset-password?token=:token',
  HEALTH_CHECK: '/health',
  SERVERS: '/', // this is the first dashboard route
  USER_PROFILE_SETTINGS: '/settings',
  USER_PREFERENCES_SETTINGS: '/settings/preferences',
  USER_SECURITY_SETTINGS: '/settings/security',
  WORKSPACE_GENERAL_SETTINGS: '/settings/workspace',
  WORKSPACE_USERS_SETTINGS: '/settings/users',
  WORKSPACE_RAILWAY_SETTINGS: '/settings/railway'
} as const;
