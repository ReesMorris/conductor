import { css } from '@/styled-system/css';

export const styles = {
  item: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2',
    padding: '2',
    paddingInline: '3',
    inlineSize: 'full',
    textStyle: 'sm',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
    transitionProperty: 'background-color, color',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',

    _hover: {
      backgroundColor: 'background.secondary'
    },

    _focus: {
      backgroundColor: 'background.secondary'
    },

    _disabled: {
      opacity: 'disabled',
      cursor: 'not-allowed',

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
    color: 'foreground'
  }),
  content: css({
    flex: '1',
    color: 'foreground',
    textAlign: 'start'
  })
};
