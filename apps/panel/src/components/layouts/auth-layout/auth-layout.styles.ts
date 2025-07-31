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
  }),

  header: css({
    textAlign: 'center',
    marginBlockEnd: '8'
  }),
  logo: css({
    inlineSize: '16',
    blockSize: '16',
    backgroundColor: 'black/35',
    backdropFilter: 'auto',
    backdropBlur: 'sm',
    borderRadius: 'full',
    marginInline: 'auto',
    marginBlockEnd: '4'
  }),
  title: css({
    textStyle: '2xl',
    fontWeight: 'bold',
    color: 'foreground',
    marginBlockEnd: '2',
    letterSpacing: 'tight'
  }),
  subtitle: css({
    color: 'foreground/40',
    textStyle: 'sm',
    fontWeight: 'medium'
  }),

  footer: css({
    marginBlockStart: '8',
    textAlign: 'center'
  }),
  footerText: css({
    textStyle: 'sm',
    color: 'foreground/40'
  })
};
