import { defineSemanticTokens } from '@pandacss/dev';

export const semanticSizes = defineSemanticTokens.sizes({
  ui: {
    sm: { value: '{sizes.9}' },
    md: { value: '{sizes.12}' }
  },
  header: { value: '4.7rem' },
  sidebar: { value: '15rem' },
  wrapper: { value: '80rem' },
  navigation: { value: '{sizes.16}' }
});
