import { defineSemanticTokens } from '@pandacss/dev';

export const semanticColors = defineSemanticTokens.colors({
  foreground: { value: { _light: '', _dark: '{colors.white}' } },
  background: {
    from: { value: { _light: '', _dark: '#1a0f2e' } },
    via: { value: { _light: '', _dark: '#150a28' } },
    to: { value: { _light: '', _dark: '#0f0a1f' } }
  },
  glass: {
    light: { value: { _light: '', _dark: '{colors.white/3}' } },
    medium: { value: { _light: '', _dark: '{colors.white/5}' } }
  }
});
