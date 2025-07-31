import { css } from '@/styled-system/css';

export const styles = {
  wrapper: css({
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
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
    boxShadowColor: 'black/20',
    inlineSize: '[28rem]'
  })
};
