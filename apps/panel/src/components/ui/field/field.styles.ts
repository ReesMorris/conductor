import { css } from '@/styled-system/css';

export const styles = {
  field: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5',

    _disabled: {
      cursor: 'not-allowed'
    }
  }),
  fieldDescription: css({
    _disabled: {
      opacity: 'disabled'
    }
  }),
  helpText: css({
    textStyle: 'xs',
    color: 'foreground.muted'
  }),
  errorText: css({
    textStyle: 'xs',
    color: 'danger.foreground'
  })
};
