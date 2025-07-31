import { css } from '@/styled-system/css';

export const styles = {
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
    marginBlockEnd: '1',
    letterSpacing: 'tight'
  }),
  subtitle: css({
    color: 'foreground/40',
    textStyle: 'sm',
    fontWeight: 'medium'
  })
};
