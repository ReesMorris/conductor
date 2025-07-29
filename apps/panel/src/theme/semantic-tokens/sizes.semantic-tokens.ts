import { defineSemanticTokens } from '@pandacss/dev';

export const semanticSizes = defineSemanticTokens.sizes({
  ui: { value: '{sizes.10}' },
  header: { value: '5rem' },
  sidebar: { value: '15rem' },
  wrapper: { value: '72rem' }
});
