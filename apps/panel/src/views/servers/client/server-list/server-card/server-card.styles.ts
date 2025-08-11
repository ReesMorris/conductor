import { css } from '@/styled-system/css';

export const styles = {
  card: css({
    blockSize: 'full',
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
    backgroundColor: 'foreground/5',
    backdropFilter: 'auto',
    backdropBlur: 'xl',
    borderRadius: '2xl',
    padding: '6',
    transitionProperty: 'background-color, transform',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',

    _hover: {
      backgroundColor: 'foreground/5',
      transform: 'translateY(-2px)'
    }
  }),
  header: css({
    display: 'flex',
    alignItems: 'center',
    gap: '3',
    position: 'relative'
  }),
  serverIcon: css({
    inlineSize: '10',
    blockSize: '10',
    backgroundColor: 'shadow',
    borderRadius: 'lg',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }),
  serverStatus: css({
    position: 'absolute',
    insetBlockStart: '0',
    insetInlineEnd: '0',
    inlineSize: '2',
    blockSize: '2',
    borderRadius: 'full',
    transitionProperty: 'background-color',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',

    '&[data-status="running"]': {
      backgroundColor: 'green.900'
    },
    '&[data-status="stopped"]': {
      backgroundColor: 'slate.900'
    },
    '&[data-status="pending"]': {
      backgroundColor: 'yellow.900'
    },
    '&[data-status="unknown"]': {
      backgroundColor: 'slate.500'
    }
  }),
  title: css({
    color: 'foreground',
    fontWeight: 'semibold',
    textStyle: 'lg'
  }),
  type: css({
    color: 'foreground/40',
    textStyle: 'sm'
  }),
  stats: css({
    blockSize: '36',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& [data-placeholder]': {
      color: 'foreground/50',
      textStyle: 'sm'
    }
  })
};
