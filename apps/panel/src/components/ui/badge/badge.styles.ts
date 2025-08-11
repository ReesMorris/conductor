import { cva } from '@/styled-system/css';

export const styles = {
  badge: cva({
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2',
      paddingInline: '2',
      paddingBlock: '1',
      textStyle: 'xs',
      fontWeight: 'medium',
      borderRadius: 'full',
      pointerEvents: 'none',

      _icon: {
        inlineSize: '3.5',
        blockSize: '3.5'
      }
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
