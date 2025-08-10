import { css } from '@/styled-system/css';

export const styles = {
  item: css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    inlineSize: 'full',
    borderRadius: 'md',
    blockSize: 'ui.lg',
    paddingInline: '3',
    textStyle: 'sm',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'glass.medium',
    fontWeight: 'medium',
    color: 'foreground',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    backdropFilter: 'auto',
    backdropBlur: 'sm',
    outlineOffset: '0',
    outlineWidth: '1',
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    transitionProperty: 'border, outline, background',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',

    '&:not(:disabled):hover': {
      borderColor: 'purple.900/10',
      backgroundColor: 'purple.900/5'
    },

    _checked: {
      backgroundColor: 'purple.900/10',
      borderColor: 'purple.900/20',

      '&:not(:disabled):hover': {
        backgroundColor: 'purple.900/10',
        borderColor: 'purple.900/20'
      }
    },

    _focusVisible: {
      zIndex: 'above',
      outlineColor: 'purple.900/20'
    },

    _disabled: {
      cursor: 'not-allowed',
      opacity: '0.2'
    }
  }),
  content: css({
    fontWeight: 'medium',

    _groupChecked: {
      color: 'purple.900'
    }
  }),
  indicator: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    inlineSize: '5',
    blockSize: '5',
    borderWidth: '2',
    borderStyle: 'solid',
    borderColor: 'foreground/30',
    borderRadius: 'full',

    _groupChecked: {
      backgroundColor: 'purple.900/10',
      borderColor: 'purple.900/40'
    }
  }),
  indicatorIcon: css({
    inlineSize: '2',
    blockSize: '2',
    borderRadius: 'full',
    backgroundColor: 'transparent',

    _groupChecked: {
      backgroundColor: 'purple.900/70'
    }
  })
};
