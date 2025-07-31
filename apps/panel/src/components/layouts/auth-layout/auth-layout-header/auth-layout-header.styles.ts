import { css } from '@/styled-system/css';

export const styles = {
  header: css({
    textAlign: 'center',
    marginBlockEnd: '8'
  }),
  logo: css({
    inlineSize: '16',
    blockSize: '16',
    backgroundColor: 'glass.light',
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
    marginBlockEnd: '1',
    letterSpacing: 'tight',
    lineHeight: 'tight'
  }),
  subtitle: css({
    color: 'foreground/60',
    textStyle: 'sm',
    fontWeight: 'medium'
  })
};
