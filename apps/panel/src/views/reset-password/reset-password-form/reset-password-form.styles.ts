import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';

export const styles = {
  form: stack({
    gap: '4'
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
