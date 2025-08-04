import { css } from '@/styled-system/css';

export const styles = {
  row: css({
    paddingBlockStart: '2',
    paddingBlockEnd: '1',
    display: 'flex',
    gap: '6'
  }),
  avatarContainer: css({
    position: 'relative',

    _loading: {
      opacity: 'disabled'
    }
  }),
  content: css({
    marginBlockStart: '-2',
    marginBlockEnd: '-1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }),
  helpText: css({
    textStyle: 'xs',
    color: 'foreground/50'
  }),
  buttonGroup: css({
    display: 'flex',
    gap: '2'
  }),
  hiddenInput: css({
    display: 'none'
  })
};
