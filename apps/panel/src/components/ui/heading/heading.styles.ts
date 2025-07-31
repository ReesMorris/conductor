import { cva } from '@/styled-system/css';

export const styles = {
  heading: cva({
    base: {
      marginBlockEnd: '4'
    },
    variants: {
      level: {
        1: { textStyle: 'h1' },
        2: { textStyle: 'h2' },
        3: { textStyle: 'h3' },
        4: { textStyle: 'h4' },
        5: {},
        6: {}
      }
    }
  })
};
