import { css } from '@/styled-system/css';

export const styles = {
  root: css({
    inlineSize: '12',
    blockSize: '6',
    backgroundColor: 'glass.dark',
    borderRadius: 'full',
    position: 'relative',
    boxShadow: 'md',
    cursor: 'pointer',

    _focusVisible: {
      outlineWidth: '2',
      outlineOffset: '0.5',
      outlineStyle: 'solid',
      outlineColor: 'primary'
    },

    _checked: {
      backgroundColor: 'primary'
    }
  }),
  thumb: css({
    display: 'block',
    inlineSize: '5',
    blockSize: '5',
    backgroundColor: 'white',
    borderRadius: 'full',
    boxShadow: 'md',
    transitionProperty: 'transform',
    transitionDuration: 'fast',
    transform: 'translateX(2px)',
    willChange: 'transform',

    _checked: {
      transform: 'translateX(26px)'
    }
  })
};
