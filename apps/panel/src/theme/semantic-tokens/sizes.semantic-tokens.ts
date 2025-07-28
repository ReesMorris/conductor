import { defineSemanticTokens } from '@pandacss/dev';

export const semanticSizes = defineSemanticTokens.sizes({
  ui: { value: '{sizes.9}' },
  header: { value: '4rem' },
  sidebar: { value: '15rem' }
});
