import type { ExtendableTheme } from '@pandacss/types';
import { fontSizes } from './semantic-tokens/font-sizes.tokens';
import { fonts } from './semantic-tokens/fonts.tokens';
import { opacity } from './semantic-tokens/opacity.tokens';
import { semanticColors } from './semantic-tokens/semantic-colors.tokens';
import { sizes } from './semantic-tokens/sizes.tokens';
import { textStyles } from './text-styles';
import { colors } from './tokens/colors.tokens';

/**
 * Module for defining the application's theme.
 * If you're changing the theme, you will need to run `codegen` to generate the new tokens.
 * @see https://panda-css.com/docs/theming/tokens
 */
export const theme: ExtendableTheme = {
  extend: {
    textStyles,
    tokens: {
      colors,
      opacity
    },
    semanticTokens: {
      colors: semanticColors,
      fontSizes,
      fonts,
      opacity,
      sizes
    }
  }
};
