import { css } from '@/styled-system/css';

export const styles = {
  form: css({
    gap: '0.5'
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: {
      md: '1fr 1fr',
      base: '1fr'
    },
    columnGap: '12',
    rowGap: '6'
  }),
  actions: css({
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '2'
  })
};
