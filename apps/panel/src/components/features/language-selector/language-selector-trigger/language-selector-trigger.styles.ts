import { css } from '@/styled-system/css';

export const styles = {
  locale: css({
    textTransform: 'uppercase',
    textStyle: 'sm',
    fontWeight: 'medium'
  }),
  chevron: css({
    transitionProperty: 'transform',
    transitionDuration: 'fast',

    _icon: {
      inlineSize: '3',
      blockSize: '3'
    },

    _open: {
      transform: 'rotate(-180deg)'
    }
  })
};
