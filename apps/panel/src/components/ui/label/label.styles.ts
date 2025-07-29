import { css } from '@/styled-system/css';

export const styles = {
  label: css({
    color: 'foreground',
    display: 'inline-flex',
    inlineSize: 'fit',
    textStyle: 'sm',
    fontWeight: 'medium',
    letterSpacing: 'wide',

    _disabled: {
      cursor: 'not-allowed',
      opacity: 'disabled'
    }
  })
};
