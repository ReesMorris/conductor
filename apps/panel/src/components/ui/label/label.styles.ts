import { css } from '@/styled-system/css';

export const styles = {
  label: css({
    color: 'foreground.muted',
    display: 'inline-flex',
    inlineSize: 'fit',
    textStyle: 'sm',
    fontWeight: 'light',
    letterSpacing: 'wide',

    _disabled: {
      cursor: 'not-allowed',
      opacity: 'disabled'
    }
  })
};
