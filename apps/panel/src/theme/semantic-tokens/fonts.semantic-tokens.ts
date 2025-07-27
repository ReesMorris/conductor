import { defineSemanticTokens } from '@pandacss/dev';

export const semanticFonts = defineSemanticTokens.fonts({
  // -- Custom Fonts --
  geist: { value: 'var(--font-geist)' },
  inter: { value: 'var(--font-inter)' },

  // -- Semantic Fonts --
  body: { value: '{fonts.geist}' },
  heading: { value: '{fonts.inter}' }
});
