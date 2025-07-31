import { css } from '@/styled-system/css';

export const styles = {
  link: css({
    display: 'flex',
    alignItems: 'center',
    inlineSize: 'full',
    blockSize: '9',
    borderRadius: 'lg',
    paddingInline: '3',
    paddingBlock: '2',
    textAlign: 'start',
    color: 'foreground/70',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'transparent',
    transitionProperty: 'background-color, color, border-color',
    transitionDuration: 'normal',

    _hover: {
      color: 'foreground',
      backgroundColor: 'foreground/5'
    },

    '&[aria-current]': {
      backgroundColor: 'purple.900/10',
      color: 'purple.900',
      borderColor: 'purple.900/20',

      _hover: {
        backgroundColor: 'purple.900/10',
        color: 'purple.900',
        borderColor: 'purple.900/20'
      }
    }
  }),
  text: css({
    display: 'flex',
    alignItems: 'center',
    gap: '3',
    textStyle: 'sm',
    fontWeight: 'medium',

    _icon: {
      inlineSize: '4',
      blockSize: '4'
    }
  })
};
