import { cva } from '@/styled-system/css';

export const styles = {
  link: cva({
    base: {
      color: 'link',
      cursor: 'pointer',
      textUnderlineOffset: '5px',
      textDecorationThickness: '1px',
      textDecorationLine: 'underline',

      _hover: {
        color: 'link.hover',
        textDecorationColor: 'current/95',
        textDecorationThickness: '1.5px'
      },

      _focusVisible: {
        outlineWidth: '2',
        outlineOffset: '1',
        outlineStyle: 'solid',
        outlineColor: 'primary.focusRing'
      }
    },
    variants: {
      underlined: {
        true: {},
        false: {
          textDecorationColor: 'transparent',
          _hover: {
            textDecorationColor: 'transparent'
          }
        }
      }
    },
    defaultVariants: {
      underlined: false
    }
  })
};
