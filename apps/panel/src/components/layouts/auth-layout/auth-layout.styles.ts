import { css } from '@/styled-system/css';

export const styles = {
  wrapper: css({
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBlockEnd: '10'
  }),
  content: css({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'glass.light',
    backdropFilter: 'auto',
    backdropBlur: 'xl',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'foreground/10',
    borderRadius: '2xl',
    padding: '8',
    boxShadow: '2xl',
    inlineSize: '[min(100vw, 28rem)]',

    mobileMediumDown: {
      inlineSize: 'full',
      borderRadius: '[0]',
      borderInlineWidth: '0'
    }
  })
};
