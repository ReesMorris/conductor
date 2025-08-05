import { css } from '@/styled-system/css';

export const styles = {
  grid: css({
    display: 'grid',
    gridTemplateColumns: {
      base: '1fr',
      sm: 'repeat(2, 1fr)'
    },
    gap: {
      base: '2',
      sm: '4'
    }
  })
};
