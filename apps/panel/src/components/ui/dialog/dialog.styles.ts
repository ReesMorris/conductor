import { sva } from '@/styled-system/css';

export const styles = sva({
  slots: [
    'trigger',
    'overlay',
    'content',
    'container',
    'header',
    'description'
  ],
  base: {
    trigger: {
      cursor: 'pointer'
    },
    overlay: {
      position: 'fixed',
      inset: '0',
      // backgroundColor: 'background.overlay',
      zIndex: 'overlay',

      _open: {
        animation: 'fade-in-smooth'
      },

      _closed: {
        animation: 'fade-out-smooth'
      }
    },
    content: {
      position: 'fixed',
      insetBlockStart: '[10vh]',
      insetInlineStart: '[50%]',
      transform: 'translateX(-50%)',
      zIndex: 'modal',

      _open: {
        _motionSafe: {
          animation: 'dialog-enter'
        },
        _motionReduce: {
          animation: 'fade-in'
        }
      },

      _closed: {
        _motionSafe: {
          animation: 'dialog-exit'
        },
        _motionReduce: {
          animation: 'fade-out'
        }
      }
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5',
      inlineSize: '[min(90vw, 25rem)]',
      maxBlockSize: '[85vh]',
      padding: '6',
      borderRadius: 'md',
      // backgroundColor: 'background',
      boxShadow: 'lg',
      outline: 'none',
      textStyle: 'sm'
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2'
    },
    description: {
      // color: 'foreground.muted'
    }
  }
});
