import { css } from '@/styled-system/css';

export const styles = {
  item: css({
    position: 'relative',
    display: 'flex',
    gap: '3',
    counterIncrement: 'step-counter',

    _last: {
      '& .step-line': {
        display: 'none'
      }
    }
  }),
  indicatorWrapper: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: '0',
    transform: 'translateY(-1px)'
  }),
  indicator: css({
    inlineSize: '7',
    blockSize: '7',
    borderRadius: 'full',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textStyle: 'sm',
    fontWeight: 'medium',
    backgroundColor: 'foreground/10',
    color: 'foreground/60',
    flexShrink: '0',

    '&::before': {
      content: 'counter(step-counter)'
    }
  }),
  line: css({
    flex: '1',
    inlineSize: '0.5',
    backgroundColor: 'foreground/20',
    marginBlock: '1',
    minBlockSize: '3',
    borderRadius: 'full'
  }),
  content: css({
    flex: '1',
    paddingBlockStart: '0.5',
    color: 'foreground/80',
    textStyle: 'sm',
    lineHeight: 'relaxed',
    marginBlockEnd: '4'
  })
};
