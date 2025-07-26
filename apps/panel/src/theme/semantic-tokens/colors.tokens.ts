import { defineSemanticTokens } from '@pandacss/dev';

export const colors = defineSemanticTokens.colors({
  background: {
    DEFAULT: {
      value: { _light: '{colors.gray.50}', _dark: '{colors.gray.900}' }
    }
  },
  foreground: {
    DEFAULT: {
      value: { _light: '{colors.gray.900}', _dark: '{colors.gray.50}' }
    }
  }
});
