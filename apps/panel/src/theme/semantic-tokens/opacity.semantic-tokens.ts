import { defineSemanticTokens } from '@pandacss/dev';

export const semanticOpacity = defineSemanticTokens.opacity({
  disabled: { value: 0.4 },
  loading: { value: 0.4 },
  placeholder: { value: 0.6 }
});
