import { css, cva } from '@/styled-system/css';

export const styles = {
  root: cva({
    base: {
      backgroundColor: 'var(--toast-bg)',
      backdropFilter: 'auto',
      backdropBlur: '2xl',
      borderRadius: 'lg',
      padding: '4',
      paddingInlineEnd: '8',
      display: 'flex',
      gap: '3',
      alignItems: 'start',
      position: 'relative',
      overflow: 'hidden',

      '&[data-state="open"]': {
        animation: 'toast-slide-in'
      },

      '&[data-state="closed"]': {
        animation: 'toast-slide-out'
      },

      '&[data-swipe="move"]': {
        transform: 'translateX(var(--radix-toast-swipe-move-x))'
      },

      '&[data-swipe="cancel"]': {
        transform: 'translateX(0)',
        transition: 'transform',
        transitionDuration: 'fast',
        transitionTimingFunction: 'out'
      },

      '&[data-swipe="end"]': {
        animation: 'toast-swipe-out'
      }
    },
    variants: {
      variant: {
        default: {
          '--toast-bg': '{colors.foreground/8}',
          '--toast-fg': '{colors.foreground/90}'
        },
        success: {
          '--toast-bg': '{colors.green.900/10}',
          '--toast-fg': '{colors.green.900/90}'
        },
        error: {
          '--toast-bg': '{colors.red.900/10}',
          '--toast-fg': '{colors.red.900/90}'
        },
        warning: {
          '--toast-bg': '{colors.yellow.900/10}',
          '--toast-fg': '{colors.yellow.900/90}'
        },
        info: {
          '--toast-bg': '{colors.blue.900/10}',
          '--toast-fg': '{colors.blue.900/90}'
        }
      }
    }
  }),
  icon: css({
    flexShrink: '0',
    transform: 'translateY(1px)',

    _icon: {
      color: 'var(--toast-fg)',
      inlineSize: '4',
      blockSize: '4'
    }
  }),
  title: css({
    fontWeight: 'medium',
    textStyle: 'sm',
    color: 'var(--toast-fg)'
  }),
  description: css({
    textStyle: 'sm',
    color: 'var(--toast-fg)',
    lineHeight: 'relaxed'
  }),
  close: css({
    position: 'absolute',
    insetBlockStart: '2',
    insetInlineEnd: '2'
  })
};
