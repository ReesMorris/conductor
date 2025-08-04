import { css } from '@/styled-system/css';

export const styles = {
  link: css({
    display: 'flex',
    blockSize: 'full',
    alignItems: 'flex-end',
    paddingBlockEnd: '4',
    paddingInline: '6',
    color: 'foreground/60',
    borderBlockEndWidth: '2',
    borderBlockEndStyle: 'solid',
    borderBlockEndColor: 'transparent',
    transitionProperty: 'color, border-color',
    transitionDuration: 'normal',

    _focusVisible: {
      outlineWidth: '2',
      outlineColor: 'purple.900',
      backgroundColor: 'purple.900/10'
    },

    '&[aria-current]': {
      color: 'purple.900',
      borderBlockEndColor: 'purple.900',

      '&:not(:disabled):hover': {
        color: 'purple.900',
        borderBlockEndColor: 'purple.900'
      }
    },

    '&:not(:disabled):hover': {
      color: 'foreground/80',
      borderBlockEndColor: 'foreground/20'
    }
  }),
  text: css({
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    textStyle: 'sm',
    fontWeight: 'medium',

    _icon: {
      inlineSize: '4',
      blockSize: '4'
    }
  })
};
