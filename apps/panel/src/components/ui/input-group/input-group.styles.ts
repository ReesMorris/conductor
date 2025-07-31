import { css } from '@/styled-system/css';

export const styles = {
  container: css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    inlineSize: 'full'
  }),
  icon: css({
    position: 'absolute',
    zIndex: 'above',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    color: 'foreground',
    opacity: '0.4',

    '&[data-position="start"]': {
      insetInlineStart: '3'
    },
    '&[data-position="end"]': {
      insetInlineEnd: '3'
    },

    _icon: {
      display: 'block',
      inlineSize: '4',
      blockSize: '4'
    }
  })
};
