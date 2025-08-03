import { cva } from '@/styled-system/css';

export const styles = {
  skeleton: cva({
    base: {
      borderRadius: 'var(--skeleton-radius)',
      backgroundColor: 'foreground/20',

      _motionSafe: {
        animation: 'pulse'
      }
    },
    variants: {
      shape: {
        square: {
          '--skeleton-radius': '0'
        },
        rounded: {
          '--skeleton-radius': '{radii.lg}'
        },
        circle: {
          '--skeleton-radius': '{radii.full}'
        }
      }
    },
    defaultVariants: {
      shape: 'rounded'
    }
  })
};
