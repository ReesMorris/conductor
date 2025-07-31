import { css } from '@/styled-system/css';

export const styles = {
  item: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2',
    paddingInline: '4',
    paddingBlock: '2',
    inlineSize: 'full',
    textStyle: 'sm',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
    transitionProperty: 'background-color, color',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',

    _hover: {
      backgroundColor: 'purple.900/10'
    },

    _focus: {
      backgroundColor: 'purple.900/10'
    },

    _disabled: {
      opacity: 'disabled',
      cursor: 'not-allowed',

      _hover: {
        backgroundColor: 'transparent'
      }
    },

    _loading: {
      opacity: 'loading',
      cursor: 'wait',

      _hover: {
        backgroundColor: 'transparent'
      }
    }
  }),
  icon: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    inlineSize: '4',
    blockSize: '4',
    flexShrink: '0',
    color: 'foreground',
    opacity: '0.7',

    _current: {
      color: 'purple.900'
    }
  }),
  content: css({
    flex: '1',
    textAlign: 'start',
    textStyle: 'sm',
    fontWeight: 'medium',
    color: 'foreground/80',

    _hover: {
      color: 'foreground'
    }
  })
};
