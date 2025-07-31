import { defineSemanticTokens } from '@pandacss/dev';

export const semanticSizes = defineSemanticTokens.sizes({
  ui: {
    xs: { value: '{sizes.7}' },
    sm: { value: '{sizes.9}' },
    md: { value: '{sizes.10}' },
    lg: { value: '{sizes.12}' }
  },
  header: { value: '4.7rem' },
  sidebar: { value: '{sizes.64}' },
  wrapper: { value: '80rem' },
  navigation: { value: '{sizes.16}' }
});
