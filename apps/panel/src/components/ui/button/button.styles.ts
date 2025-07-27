import { css, cva } from '@/styled-system/css';

export const styles = {
  button: cva({
    base: {
      position: 'relative',
      blockSize: 'ui',
      borderRadius: 'md',
      textStyle: 'sm',
      fontWeight: 'medium',
      cursor: 'pointer',
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: 'transparent',
      transitionProperty: 'border-color, background-color, transform',
      transitionDuration: 'normal',
      transitionTimingFunction: 'in-out',

      _active: {
        transform: 'scale(0.99)'
      },

      _disabled: {
        opacity: 'disabled',
        cursor: 'not-allowed'
      },

      _loading: {
        opacity: 'loading',
        cursor: 'wait'
      },

      _focusVisible: {
        outlineWidth: '2',
        outlineOffset: '0.5',
        outlineStyle: 'solid',
        outlineColor: 'colorPalette.focusRing'
      }
    },
    variants: {
      color: {
        primary: {
          colorPalette: 'primary'
        },
        secondary: {},
        tertiary: {},
        ghost: {}
      },
      variant: {
        solid: {
          backgroundColor: 'colorPalette.background.solid',
          color: 'colorPalette.foreground.onSolid',

          '&:not(:disabled):hover': {
            backgroundColor: 'colorPalette.background.solid.hover'
          }
        },
        subtle: {
          backgroundColor: 'colorPalette.background.subtle',
          color: 'colorPalette.foreground.onSubtle',

          '&:not(:disabled):hover': {
            backgroundColor: 'colorPalette.background.subtle.hover'
          }
        },
        outline: {
          backgroundColor: 'transparent',
          color: 'colorPalette.foreground',
          borderColor: 'colorPalette.border',

          '&:not(:disabled):hover': {
            borderColor: 'colorPalette.border.hover'
          }
        }
      }
    },
    defaultVariants: {
      variant: 'solid',
      color: 'primary'
    }
  }),
  content: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    inlineSize: 'full',
    opacity: '1',
    transitionProperty: 'opacity',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',

    '.group:is([aria-busy]) &': {
      pointerEvents: 'none',
      opacity: '0'
    }
  }),
  loadingSpinner: css({
    opacity: '0',
    position: 'absolute',
    inset: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    transitionProperty: 'opacity',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',
    animation: 'spin',

    '.group:is([aria-busy]) &': {
      opacity: '1'
    },

    _icon: {
      transform: 'scale(0.75)'
    }
  })
};
