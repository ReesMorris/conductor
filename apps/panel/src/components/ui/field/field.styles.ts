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
  labelContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2'
  }),
  fieldDescription: css({
    _disabled: {
      opacity: 'disabled'
    }
  }),
  helpText: css({
    textStyle: 'xs',
    color: 'foreground/40'
  }),
  errorText: css({
    textStyle: 'xs',
    color: 'red.400'
  })
};
