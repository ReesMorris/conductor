import type { ExtendableTheme } from '@pandacss/types';
import { colors } from './semantic-tokens/colors.tokens';
import { fonts } from './semantic-tokens/fonts.tokens';

/**
 * Module for defining the application's theme.
 * If you're changing the theme, you will need to run `codegen` to generate the new tokens.
 * @see https://panda-css.com/docs/theming/tokens
 */
export const theme: ExtendableTheme = {
  extend: {
    semanticTokens: {
      colors,
      fonts
    }
  }
};
