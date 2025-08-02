import { defineSemanticTokens } from '@pandacss/dev';

export const semanticColors = defineSemanticTokens.colors({
  foreground: {
    DEFAULT: { value: '{colors.slate.950}' },
    subtle: { value: '{colors.slate.900}' },
    contrast: { value: '{colors.slate.50}' }
  },
  background: {
    from: { value: { _light: '#f8fafc', _dark: '#1a0f2e' } },
    via: { value: { _light: '#f8fafc', _dark: '#150a28' } },
    to: { value: { _light: '#e2e8f0', _dark: '#0f0a1f' } }
  },
  glass: {
    light: {
      value: { _light: '{colors.black/1.1}', _dark: '{colors.white/3}' }
    },
    medium: {
      value: { _light: '{colors.black/5}', _dark: '{colors.white/5}' }
    },
    dark: {
      value: { _light: '{colors.black/12}', _dark: '{colors.white/15}' }
    },
    darker: {
      value: { _light: '{colors.black/13}', _dark: '{colors.white/25}' }
    }
  },
  primary: {
    DEFAULT: { value: '#8e4ec6' },
    hover: { value: '#7b3f9e' },
    contrast: { value: '#ffffff' }
  },
  shadow: { value: { _light: '{colors.black/10}', _dark: '{colors.black/20}' } }
});
