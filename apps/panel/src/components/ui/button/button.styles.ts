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
      backgroundColor: 'var(--button-bg)',
      color: 'var(--button-fg)',
      transitionProperty: 'border-color, background-color, transform',
      transitionDuration: 'normal',
      transitionTimingFunction: 'in-out',

      '&:not(:disabled):hover': {
        backgroundColor: 'var(--button-bg-hover)'
      },

      _active: {
        transform: 'translateY(0.125rem)'
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
        outlineColor: 'var(--button-bg)'
      }
    },
    variants: {
      variant: {
        primary: {
          '--button-fg': 'colors.foreground',
          '--button-bg': 'colors.purple.800',
          '--button-bg-hover': 'colors.purple.700'
        }
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
