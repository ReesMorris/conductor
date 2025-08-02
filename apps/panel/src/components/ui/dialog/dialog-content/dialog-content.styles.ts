import { css } from '@/styled-system/css';

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
    backdropBlur: 'xl',
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
  container: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '5',
    inlineSize: '[min(90vw, 25rem)]',
    maxBlockSize: '[85vh]',
    padding: '6',
    backgroundColor: 'background.from',
    backdropFilter: 'auto',
    backdropBlur: 'xl',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'foreground/20',
    borderRadius: 'lg',
    boxShadow: '2xl',
    outline: 'none',
    textStyle: 'sm'
  })
};
