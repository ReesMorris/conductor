import { defineSemanticTokens } from '@pandacss/dev';

export const semanticFontSizes = defineSemanticTokens.fontSizes({
  body: { value: '{fontSizes.md}' },
  h1: { value: '{fontSizes.2xl}' },
  h2: { value: '{fontSizes.xl}' },
  h3: { value: '{fontSizes.lg}' },
  h4: { value: '{fontSizes.md}' }
});
