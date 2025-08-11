import { css } from '@/styled-system/css';

export const styles = {
  container: css({
    display: 'flex',
    alignItems: 'center',
    marginInline: 'auto',
    inlineSize: 'fit'
  }),
  list: css({
    display: 'flex',
    alignItems: 'center',
    gap: '1.5'
  }),
  step: css({
    flexShrink: '0',
    flexGrow: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    _icon: {
      inlineSize: '2.5',
      blockSize: '2.5'
    }
  }),
  indicator: css({
    inlineSize: '6',
    blockSize: '6',
    borderRadius: 'full',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'xs',
    fontWeight: 'medium',
    transitionProperty: 'background-color, border-color, color',
    transitionDuration: 'normal',
    borderWidth: '1.5',
    borderStyle: 'solid',
    flexShrink: '0',

    _active: {
      borderColor: 'primary',
      backgroundColor: 'primary',
      color: 'primary.contrast'
    },

    _complete: {
      backgroundColor: 'primary',
      borderColor: 'primary',
      color: 'primary.contrast'
    },

    _incomplete: {
      backgroundColor: 'transparent',
      borderColor: 'foreground/20',
      color: 'foreground/40'
    }
  }),
  line: css({
    flex: '1',
    blockSize: '0.5',
    backgroundColor: 'foreground/20',
    transitionProperty: 'background-color',
    transitionDuration: 'normal',
    minInlineSize: '8',
    listStyle: 'none',

    _complete: {
      backgroundColor: 'primary'
    }
  })
};
