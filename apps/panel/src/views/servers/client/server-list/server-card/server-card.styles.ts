import { css } from '@/styled-system/css';

export const styles = {
  card: css({
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
  icon: css({
    inlineSize: '10',
    blockSize: '10',
    backgroundColor: 'shadow',
    borderRadius: 'lg',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
  }),
  footer: css({
    display: 'flex',
    gap: '2'
  }),
  manageButton: css({
    flexGrow: 1
  })
};
