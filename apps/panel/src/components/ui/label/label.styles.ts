import { css } from '@/styled-system/css';

export const styles = {
  label: css({
    display: 'inline-flex',
    inlineSize: 'fit',
    color: 'foreground/80',
    textStyle: 'sm',
    fontWeight: 'medium',

    _disabled: {
      cursor: 'not-allowed',
      opacity: 'disabled'
    }
  })
};
