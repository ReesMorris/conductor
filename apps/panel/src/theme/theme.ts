import type { ExtendableTheme } from '@pandacss/types';
import { colors } from './semantic-tokens/colors.tokens';
import { fontSizes } from './semantic-tokens/font-sizes.tokens';
import { fonts } from './semantic-tokens/fonts.tokens';
import { opacity } from './semantic-tokens/opacity.tokens';
import { sizes } from './semantic-tokens/sizes.tokens';
import { textStyles } from './text-styles';

/**
 * Module for defining the application's theme.
 * If you're changing the theme, you will need to run `codegen` to generate the new tokens.
 * @see https://panda-css.com/docs/theming/tokens
 */
export const theme: ExtendableTheme = {
  extend: {
    textStyles,
    tokens: {
      opacity
    },
    semanticTokens: {
      colors,
      fontSizes,
      fonts,
      opacity,
      sizes
    }
  }
};
