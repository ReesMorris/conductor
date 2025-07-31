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
  fieldWrapper: css({
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: 'auto auto',
    gap: '1.5',
    alignItems: 'start'
  }),
  labelContainer: css({
    gridColumn: '1',
    gridRow: '1'
  }),
  labelSuffix: css({
    gridColumn: '2',
    gridRow: '1',
    justifySelf: 'end'
  }),
  inputWrapper: css({
    gridColumn: '1 / -1',
    gridRow: '2'
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
    color: 'red.800'
  })
};
