import { css } from '@/styled-system/css';

export const styles = {
  content: css({
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    inlineSize: 'full'
  }),
  chevron: css({
    marginInlineStart: 'auto',
    display: 'flex',
    transitionProperty: 'transform',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',

    '&[data-open]': {
      transform: 'rotate(180deg)'
    },

    _icon: {
      inlineSize: '4',
      blockSize: '4'
    }
  })
};
