import { cva } from '@/styled-system/css';

export const styles = {
  badge: cva({
    base: {
      paddingInline: '2',
      paddingBlock: '1',
      textStyle: 'xs',
      fontWeight: 'medium',
      borderRadius: 'full',
      pointerEvents: 'none'
    },
    variants: {
      color: {
        green: {
          backgroundColor: 'green.900/10',
          color: 'green.900'
        }
      }
    },
    defaultVariants: {
      color: 'green'
    }
  })
};
