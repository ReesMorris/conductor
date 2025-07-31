import type { ExtendableTheme } from '@pandacss/types';
import { breakpoints } from './breakpoints';
import { semanticColors } from './semantic-tokens/colors.semantic-tokens';
import { semanticFontSizes } from './semantic-tokens/font-sizes.semantic-tokens';
import { semanticFonts } from './semantic-tokens/fonts.semantic-tokens';
import { semanticOpacity } from './semantic-tokens/opacity.semantic-tokens';
import { semanticSizes } from './semantic-tokens/sizes.semantic-tokens';
import { semanticSpacing } from './semantic-tokens/spacing.semantic-tokens';
import { textStyles } from './text-styles';
import { animations } from './tokens/animations.tokens';
import { colors } from './tokens/colors.tokens';
import { keyframes } from './tokens/keyframes.tokens';
import { opacity } from './tokens/opacity.tokens';
import { zIndices } from './tokens/z-indices.tokens';

/**
 * Module for defining the application's theme.
 * If you're changing the theme, you will need to run `codegen` to generate the new tokens.
 * @see https://panda-css.com/docs/theming/tokens
 */
export const theme: ExtendableTheme = {
  extend: {
    breakpoints,
    keyframes,
    textStyles,
    tokens: {
      animations,
      colors,
      opacity,
      zIndex: zIndices
    },
    semanticTokens: {
      colors: semanticColors,
      fontSizes: semanticFontSizes,
      fonts: semanticFonts,
      opacity: semanticOpacity,
      sizes: semanticSizes,
      spacing: semanticSpacing
    }
  }
};
