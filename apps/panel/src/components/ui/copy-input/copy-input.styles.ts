import { css } from '@/styled-system/css';

export const styles = {
  container: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'glass.inverse',
    borderRadius: 'lg',
    paddingInline: '3',
    paddingBlock: '2'
  }),
  code: css({
    color: 'purple.900',
    textStyle: 'sm',
    fontFamily: 'mono'
  }),
  button: css({
    color: 'foreground/60',
    transition: 'colors',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    padding: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    _hover: {
      color: 'foreground'
    },

    _active: {
      transform: 'scale(0.95)'
    },

    _icon: {
      inlineSize: '4',
      blockSize: '4'
    }
  })
};
