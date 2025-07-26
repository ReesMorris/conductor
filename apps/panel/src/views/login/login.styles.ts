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
    gap: '8',
    padding: '10',
    borderRadius: 'md',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'border.muted',
    inlineSize: 'min(100vw, 30rem)',
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
  subtitle: css({
    textStyle: 'md',
    color: 'foreground.muted'
  })
};
