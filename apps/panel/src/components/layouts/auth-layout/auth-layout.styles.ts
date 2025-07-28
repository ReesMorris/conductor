import { css } from '@/styled-system/css';

export const styles = {
  wrapper: css({
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2'
  }),
  content: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '3',
    padding: '10',
    borderRadius: 'md',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'border.subtle',
    inlineSize: '[min(100vw, 30rem)]',
    boxShadow: 'sm'
  }),
  header: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBlockEnd: '4'
  }),
  footer: css({
    textAlign: 'center'
  }),
  footerText: css({
    textStyle: 'sm',
    color: 'foreground.muted'
  }),
  actionRow: css({
    marginBlockStart: '4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  actionRowButton: css({
    inlineSize: '12',
    blockSize: '12',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    opacity: '0.7',
    transitionProperty: 'opacity',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',

    _hover: {
      opacity: '1'
    },

    _icon: {
      inlineSize: '4',
      blockSize: '4'
    }
  })
};
