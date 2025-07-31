import { css, cva } from '@/styled-system/css';

export const styles = {
  root: cva({
    base: {
      minInlineSize: '48',
      backgroundColor: 'glass.light',
      borderRadius: 'lg',
      paddingBlock: '2',
      boxShadow: '2xl',
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: 'foreground/10',
      zIndex: 'dropdown',
      backdropFilter: 'auto',
      backdropBlur: 'xl',
      boxShadowColor: 'black/20',

      _open: {
        _motionSafe: {
          animation: 'enter'
        },
        _motionReduce: {
          animation: 'fade-in'
        }
      },

      _closed: {
        _motionSafe: {
          animation: 'exit'
        },
        _motionReduce: {
          animation: 'fade-out'
        }
      }
    }
  }),
  trigger: css({
    cursor: 'pointer'
  })
};
