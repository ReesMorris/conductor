import { css } from '@/styled-system/css';

export const styles = {
  container: css({
    inlineSize: 'sidebar',
    blockSize: 'full',
    display: 'flex',
    userSelect: 'none'
  }),
  link: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3',
    inlineSize: 'fit'
  }),
  name: css({
    fontWeight: 'black',
    letterSpacing: 'tight',
    textStyle: 'lg'
  })
};
