import { css } from '@/styled-system/css';

export const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '8',
    paddingBlockStart: {
      lg: '24',
      md: '16',
      sm: '10',
      base: '4'
    }
  }),
  content: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    inlineSize: 'full'
  }),
  indicator: css({
    color: 'foreground/30',
    marginBlockEnd: '8',

    _icon: {
      inlineSize: '12',
      blockSize: '12'
    }
  }),
  title: css({
    fontSize: '2xl',
    color: 'foreground',
    fontWeight: 'bold',
    lineHeight: 'tight',
    marginBlockEnd: '3'
  }),
  description: css({
    color: 'foreground.subtle',
    lineHeight: 'relaxed',
    marginBlockEnd: '8'
  }),
  actions: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '3',
    alignItems: 'center',
    marginTop: '2'
  })
};
