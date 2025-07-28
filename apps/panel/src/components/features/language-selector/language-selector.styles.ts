import { css } from '@/styled-system/css';

export const styles = {
  dialog: css({
    maxInlineSize: '16'
  }),
  languageList: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5'
  }),
  languageItem: css({
    display: 'flex',
    alignItems: 'center',
    gap: '3',
    padding: '3',
    borderRadius: 'sm',
    textAlign: 'start',
    inlineSize: 'full',
    cursor: 'pointer',
    transitionProperty: 'background-color',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',

    _hover: {
      backgroundColor: 'background.secondary'
    },

    _disabled: {
      opacity: 'disabled',
      cursor: 'not-allowed'
    },

    _loading: {
      cursor: 'wait',
      opacity: 'loading'
    },

    _selected: {
      fontWeight: 'medium',
      color: 'primary.foreground.onSolid',
      backgroundColor: 'primary.background.solid',

      _hover: {
        backgroundColor: 'primary.background.solid'
      }
    }
  }),
  languageInfo: css({
    flex: '1',
    display: 'flex'
  }),
  languageNameTranslated: css({
    textStyle: 'sm',

    _before: {
      content: '"-"',
      marginInline: '2'
    }
  }),
  languageCheck: css({
    inlineSize: '3.5',
    blockSize: '3.5',
    flexShrink: '0'
  })
};
