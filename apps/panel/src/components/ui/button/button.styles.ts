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
      backgroundColor: 'colorPalette.background',
      color: 'colorPalette.foreground',
      transitionProperty: 'background-color, transform',
      transitionDuration: 'normal',
      transitionTimingFunction: 'in-out',

      '&:not(:disabled):hover': {
        backgroundColor: 'colorPalette.background.hover'
      },

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
      }
    },
    variants: {
      variant: {
        primary: {
          colorPalette: 'primary'
        },
        secondary: {},
        tertiary: {},
        ghost: {}
      }
    },
    defaultVariants: {
      variant: 'primary'
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
