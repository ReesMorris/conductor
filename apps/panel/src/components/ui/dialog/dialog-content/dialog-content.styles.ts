import { css, cva } from '@/styled-system/css';

export const styles = {
  overlay: css({
    position: 'fixed',
    inset: '0',
    backgroundColor: 'black/60',
    zIndex: 'overlay',
    backdropFilter: 'auto',
    backdropBlur: 'sm',

    '&[data-state="open"]': {
      animation: 'fade-in-smooth'
    },

    '&[data-state="closed"]': {
      animation: 'fade-out-smooth'
    }
  }),
  content: css({
    position: 'fixed',
    insetBlockStart: '[10vh]',
    insetInlineStart: '[50%]',
    transform: 'translateX(-50%)',
    backdropFilter: 'auto',
    backdropBlur: '3xl',
    zIndex: 'modal',

    '&[data-state="open"]': {
      _motionSafe: {
        animation: 'dialog-enter'
      },
      _motionReduce: {
        animation: 'fade-in'
      }
    },

    '&[data-state="closed"]': {
      _motionSafe: {
        animation: 'dialog-exit'
      },
      _motionReduce: {
        animation: 'fade-out'
      }
    }
  }),
  container: cva({
    base: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5',
      inlineSize: '[min(90vw, var(--dialog-width))]',
      maxBlockSize: '[85vh]',
      padding: '8',
      backdropFilter: 'auto',
      backdropBlur: 'xl',
      borderRadius: 'lg',
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: 'foreground/8',
      backgroundColor: 'foreground/5',
      overflow: 'auto',
      boxShadow: '2xl',
      outline: 'none',
      textStyle: 'sm'
    },
    variants: {
      size: {
        md: {
          '--dialog-width': '25rem'
        },
        lg: {
          '--dialog-width': '40rem'
        },
        xl: {
          '--dialog-width': '60rem'
        }
      }
    },
    defaultVariants: {
      size: 'md'
    }
  })
};
