import { css, cva } from '@/styled-system/css';

export const styles = {
  button: cva({
    base: {
      position: 'relative',
      borderRadius: 'lg',
      blockSize: 'var(--button-height)',
      textStyle: 'sm',
      fontWeight: 'medium',
      cursor: 'pointer',
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: 'var(--button-border, transparent)',
      backgroundColor: 'var(--button-bg)',
      color: 'var(--button-fg)',
      backdropFilter: 'auto',
      backdropBlur: 'md',
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
          '--button-fg': '{colors.foreground}',
          '--button-bg': '{colors.purple.800}',
          '--button-bg-hover': '{colors.purple.700}'
        },
        outlined: {
          '--button-fg': '{colors.foreground.subtle}',
          '--button-bg': '{colors.foreground/5}',
          '--button-border': '{colors.foreground/10}',
          '--button-bg-hover': '{colors.foreground/10}'
        }
      },
      size: {
        sm: {
          '--button-height': 'sizes.ui.sm'
        },
        md: {
          '--button-height': 'sizes.ui.md'
        }
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
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
