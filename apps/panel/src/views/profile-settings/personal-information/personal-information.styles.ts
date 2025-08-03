import { css } from '@/styled-system/css';

export const styles = {
  grid: css({
    display: 'grid',
    gridTemplateColumns: {
      md: '1fr 1fr',
      base: '1fr'
    },
    columnGap: '12',
    rowGap: '6'
  })
};
