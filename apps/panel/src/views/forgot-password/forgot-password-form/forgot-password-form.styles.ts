import { css } from '@/styled-system/css';

export const styles = {
  form: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4'
  }),
  successMessage: css({
    textStyle: 'sm',
    color: 'foreground.subtle'
  }),
  backLink: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2',

    _icon: {
      transitionProperty: 'transform',
      transitionDuration: 'normal',
      transitionTimingFunction: 'in-out',
      inlineSize: '3',
      blockSize: '3'
    },

    _hover: {
      _icon: {
        transform: 'translateX(-2px)'
      }
    }
  })
};
