import { defineSemanticTokens } from '@pandacss/dev';

export const semanticColors = defineSemanticTokens.colors({
  // -- APP COLORS --

  background: {
    DEFAULT: { value: { _light: '#f8f8f8', _dark: '#121212' } },
    gradient: {
      from: { value: { _light: '#ffffff', _dark: '#1a1625' } },
      to: { value: { _light: '#faf9fb', _dark: '#0f0d18' } }
    },
    overlay: { value: 'rgba(0, 0, 0, 0.6)' }
  },
  foreground: {
    DEFAULT: { value: { _light: '#333333', _dark: '#e6e6e6' } },
    muted: { value: { _light: '#808080', _dark: '#b3b3b3' } }
  },
  border: {
    DEFAULT: {
      value: { _light: 'rgba(204,204,204,0.5)', _dark: 'rgba(255,255,255,0.2)' }
    },
    hover: {
      value: { _light: 'rgba(179,179,179,0.5)', _dark: 'rgba(255,255,255,0.3)' }
    },
    subtle: {
      value: {
        _light: 'rgba(242,242,242,0.05)',
        _dark: 'rgba(255,255,255,0.1)'
      }
    }
  },
  link: {
    DEFAULT: { value: { _light: '#3b82f6', _dark: '#3c98e9' } },
    hover: { value: { _light: '#60a5fa', _dark: '#3b82f6' } }
  },

  // -- PALETTE COLORS --

  primary: {
    background: {
      solid: {
        DEFAULT: { value: { _light: '#3b82f6', _dark: '#1e40af' } },
        hover: { value: { _light: '#60a5fa', _dark: '#3b82f6' } }
      },
      subtle: {
        DEFAULT: { value: { _light: '#dbeafe', _dark: '#1e3a8a' } },
        hover: { value: { _light: '#eff6ff', _dark: '#1e40af' } }
      }
    },
    foreground: {
      DEFAULT: { value: { _light: '#ffffff', _dark: '#7dd3fc' } },
      muted: { value: { _light: '#cccccc', _dark: '#b3b3b3' } },
      onSolid: { value: { _light: '#ffffff', _dark: '#e6e6e6' } },
      onSubtle: { value: { _light: '#333333', _dark: '#cccccc' } }
    },
    border: {
      DEFAULT: { value: { _light: '#3b82f6', _dark: '#4a5568' } },
      hover: { value: { _light: '#93c5fd', _dark: '#6a7280' } },
      subtle: { value: { _light: '#60a5fa', _dark: '#5a6570' } }
    },
    focusRing: { value: { _light: '#3b82f6', _dark: '#1e40af' } }
  },

  danger: {
    background: {
      solid: {
        DEFAULT: { value: { _light: '#ff0000', _dark: '#990000' } },
        hover: { value: { _light: '#ff3333', _dark: '#cc0000' } }
      },
      subtle: {
        DEFAULT: { value: { _light: '#ffe6e6', _dark: '#660000' } },
        hover: { value: { _light: '#fff5f5', _dark: '#990000' } }
      }
    },
    foreground: {
      DEFAULT: { value: { _light: '#ffffff', _dark: '#ff6b6b' } },
      muted: { value: { _light: '#cccccc', _dark: '#b3b3b3' } },
      onSolid: { value: { _light: '#ffffff', _dark: '#e6e6e6' } },
      onSubtle: { value: { _light: '#333333', _dark: '#cccccc' } }
    },
    border: {
      DEFAULT: { value: { _light: '#ff0000', _dark: '#9c3e3e' } },
      hover: { value: { _light: '#ff6666', _dark: '#ba5656' } },
      subtle: { value: { _light: '#ff3333', _dark: '#b30000' } }
    }
  }
});
