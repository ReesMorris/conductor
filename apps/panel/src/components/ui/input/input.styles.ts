import { css } from '@/styled-system/css';

export const styles = {
  input: css({
    display: 'inline-flex',
    inlineSize: 'full',
    paddingInline: '2.5',
    borderRadius: 'md',
    textStyle: 'sm',
    blockSize: 'ui',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'border',
    transitionProperty: 'border-color, outline',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',
    outlineWidth: '1',
    outlineStyle: 'solid',
    outlineColor: 'transparent',

    '&:not(:disabled):hover': {
      borderColor: 'border.hover',

      _invalid: {
        borderColor: 'danger.border.hover'
      }
    },

    _focus: {
      outlineOffset: '0',
      outlineWidth: '1',
      outlineStyle: 'solid',
      outlineColor: 'border.hover',
      borderColor: 'border.hover',

      _invalid: {
        borderColor: 'danger.border.hover',
        outlineColor: 'danger.border.hover'
      }
    },

    _placeholder: {
      opacity: 'placeholder'
    },

    _invalid: {
      borderColor: 'danger.border'
    },

    _disabled: {
      cursor: 'not-allowed',
      opacity: 'disabled'
    }
  })
};
