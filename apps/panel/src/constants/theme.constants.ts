export const THEME_NAMES = ['light', 'dark'] as const;
export type ThemeName = (typeof THEME_NAMES)[number];
