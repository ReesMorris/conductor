import { defineSemanticTokens } from '@pandacss/dev';

export const fonts = defineSemanticTokens.fonts({
  // -- Custom Fonts --
  geist: { value: 'var(--font-geist)' },

  // -- Semantic Fonts --
  body: { value: '{fonts.geist}' }
});
