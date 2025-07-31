import { globalStyles } from '@/theme/global.styles';
import { theme } from '@/theme/theme';
import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Global styles
  globalCss: globalStyles,

  // Hash class names for production
  hash: {
    className: true,
    cssVar: false
  },

  // Whether to minify the generated css
  minify: true,

  // The framework for your css system
  jsxFramework: 'react',

  // Whether to allow shorthand properties
  shorthands: false,

  // Useful for theme customization
  theme: theme,

  // The css selectors or media queries shortcuts
  conditions: {
    light: '.light &',
    dark: '.dark &'
  },

  // The output directory for your css system
  outdir: 'styled-system',

  // Only allow token values and prevent custom or raw CSS values
  strictTokens: true,

  // Only use valid CSS values for properties that do have a predefined list of values
  strictPropertyValues: true
});
