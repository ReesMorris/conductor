import { css, cva } from '@/styled-system/css';

export const styles = {
  button: cva({
    base: {
      position: 'relative',
      borderRadius: 'var(--button-radius)',
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
      paddingInline: 'var(--button-padding)',
      transitionProperty: 'color, border-color, background-color, transform',
      transitionDuration: 'normal',
      transitionTimingFunction: 'in-out',

      '&:not(:disabled):hover': {
        color: 'var(--button-fg-hover, var(--button-fg))',
        backgroundColor: 'var(--button-bg-hover)'
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
        outlineColor: 'var(--button-focus-color)'
      }
    },
    variants: {
      variant: {
        primary: {
          '--button-fg': '{colors.primary.contrast}',
          '--button-bg': '{colors.primary}',
          '--button-bg-hover': '{colors.primary.hover}',
          '--button-focus-color': '{colors.primary}',

          '&:not(:disabled):active': {
            transform: 'translateY(0.125rem)'
          }
        },
        outlined: {
          '--button-fg': '{colors.foreground.subtle}',
          '--button-bg': '{colors.glass.medium}',
          '--button-border': '{colors.glass.dark}',
          '--button-bg-hover': '{colors.glass.dark}',
          '--button-focus-color': '{colors.glass.darker}'
        },
        ghost: {
          '--button-fg': '{colors.foreground.subtle}',
          '--button-bg': 'transparent',
          '--button-bg-hover': '{colors.foreground/5}',
          '--button-fg-hover': '{colors.foreground}',
          '--button-focus-color': '{colors.glass.darker}'
        },
        destructive: {
          '--button-fg': '{colors.red.900}',
          '--button-bg': '{colors.red.900/10}',
          '--button-bg-hover': '{colors.red.900/20}',
          '--button-focus-color': '{colors.red.900/50}',
          '--button-border': '{colors.red.900/20}'
        }
      },
      size: {
        xs: {
          '--button-height': 'sizes.ui.xs',
          '--button-padding': '{spacing.2}',
          '--button-gap': '{spacing.1}'
        },
        sm: {
          '--button-height': 'sizes.ui.sm',
          '--button-padding': '{spacing.3}',
          '--button-gap': '{spacing.2}'
        },
        md: {
          '--button-height': 'sizes.ui.md',
          '--button-padding': '{spacing.3.5}',
          '--button-gap': '{spacing.3}'
        },
        lg: {
          '--button-height': 'sizes.ui.lg',
          '--button-padding': '{spacing.6}',
          '--button-gap': '{spacing.3}'
        }
      },
      shape: {
        square: {
          '--button-radius': '0'
        },
        rounded: {
          '--button-radius': '{radii.lg}'
        },
        circle: {
          '--button-radius': '{radii.full}'
        }
      }
    },
    defaultVariants: {
      variant: 'primary',
      shape: 'rounded',
      size: 'md'
    }
  }),
  content: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--button-gap)',
    blockSize: 'full',
    inlineSize: 'full',
    opacity: '1',
    transitionProperty: 'opacity',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',

    '.group:is([aria-busy]) &': {
      pointerEvents: 'none',
      opacity: '0'
    },

    _icon: {
      inlineSize: '[1.2em]',
      blockSize: '[1.2em]'
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
