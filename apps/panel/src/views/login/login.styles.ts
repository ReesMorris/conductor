import { css } from '@/styled-system/css';

export const styles = {
  wrapper: css({
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
    gap: '4',
    textAlign: 'center',
    marginBlockEnd: '4'
  }),
  logo: css({
    padding: '1',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'border',
    backgroundColor: 'background',
    marginBlockStart: '[-5rem]'
  })
};
