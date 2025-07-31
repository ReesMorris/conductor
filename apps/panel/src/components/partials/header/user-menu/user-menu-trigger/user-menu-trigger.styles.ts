import { css } from '@/styled-system/css';

export const styles = {
  chevron: css({
    marginInlineStart: '3',
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
