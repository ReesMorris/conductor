import { defineSemanticTokens } from '@pandacss/dev';

export const semanticColors = defineSemanticTokens.colors({
  // -- Base Colors --
  background: {
    DEFAULT: {
      value: { _light: '{colors.gray.50}', _dark: '{colors.gray.900}' }
    },
    overlay: { value: '{colors.black/60}' }
  },
  foreground: {
    DEFAULT: {
      value: { _light: '{colors.gray.900}', _dark: '{colors.gray.50}' }
    },
    muted: {
      value: { _light: '{colors.gray.600}', _dark: '{colors.gray.400}' }
    }
  },
  border: {
    DEFAULT: {
      value: { _light: '{colors.gray.200}', _dark: '{colors.gray.700}' }
    },
    hover: {
      value: { _light: '{colors.gray.300}', _dark: '{colors.gray.600}' }
    },
    muted: {
      value: { _light: '{colors.gray.100}', _dark: '{colors.gray.800}' }
    }
  },

  // -- Color Palettes --
  primary: {
    50: { value: '#f5f3ff' },
    100: { value: '#ede9fe' },
    200: { value: '#ddd6fe' },
    300: { value: '#c4b5fd' },
    400: { value: '#a78bfa' },
    500: { value: '#8b5cf6' },
    600: { value: '#7c3aed' },
    700: { value: '#6d28d9' },
    800: { value: '#5b21b6' },
    900: { value: '#4c1d95' },
    background: {
      DEFAULT: {
        value: { _light: '{colors.primary.50}', _dark: '{colors.primary.900}' }
      },
      hover: {
        value: { _light: '{colors.primary.100}', _dark: '{colors.primary.800}' }
      }
    },
    foreground: {
      DEFAULT: {
        value: { _light: '{colors.primary.900}', _dark: '{colors.primary.50}' }
      }
    }
  },
  danger: {
    foreground: {
      DEFAULT: {
        value: { _light: '{colors.red.900}', _dark: '{colors.red.100}' }
      }
    },
    background: {
      DEFAULT: {
        value: { _light: '{colors.red.50}', _dark: '{colors.red.900}' }
      }
    },
    border: {
      DEFAULT: {
        value: { _light: '{colors.red.200}', _dark: '{colors.red.400}' }
      },
      hover: {
        value: { _light: '{colors.red.300}', _dark: '{colors.red.500}' }
      }
    }
  }
});
