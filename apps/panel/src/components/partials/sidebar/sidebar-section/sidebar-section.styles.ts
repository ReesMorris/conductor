import { css } from '@/styled-system/css';

export const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '3'
  }),
  title: css({
    textStyle: 'xs',
    fontWeight: 'semibold',
    textTransform: 'uppercase',
    letterSpacing: 'wider',
    color: 'foreground/50'
  }),
  content: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1'
  })
};
