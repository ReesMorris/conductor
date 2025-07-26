import { cva } from '@/styled-system/css';

export const styles = {
  heading: cva({
    variants: {
      level: {
        1: { textStyle: 'h1' },
        2: { textStyle: 'h2' },
        3: { textStyle: 'h3' },
        4: { textStyle: 'h4' },
        5: { textStyle: 'h5' },
        6: { textStyle: 'h6' }
      }
    }
  })
};
