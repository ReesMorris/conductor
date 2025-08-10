import { css } from '@/styled-system/css';

export const styles = {
  header: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBlockEnd: '6'
  }),
  title: css({
    textStyle: '2xl',
    fontWeight: 'bold',
    color: 'foreground'
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: {
      xl: 'repeat(3, 1fr)',
      lg: 'repeat(2, 1fr)',
      md: 'repeat(1, 1fr)'
    },
    gap: '6'
  })
};
