import { css, cva } from '@/styled-system/css';

export const styles = {
  root: cva({
    base: {
      minInlineSize: '28',
      backgroundColor: 'background',
      borderRadius: 'lg',
      paddingBlock: '2',
      boxShadow: 'lg',
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: 'border',
      zIndex: 'dropdown',

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
