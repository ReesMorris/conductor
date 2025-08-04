import { css } from '@/styled-system/css';

export const styles = {
  card: css({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '4',
    padding: '4',
    borderRadius: 'lg',
    borderWidth: '1',
    borderStyle: 'solid',
    backgroundColor: 'foreground/2',
    borderColor: 'foreground/10'
  }),
  left: css({
    flex: '1',
    minInlineSize: '64'
  }),
  title: css({
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    flexWrap: 'wrap',
    fontWeight: 'medium'
  }),
  details: css({
    display: 'flex',
    flexDirection: 'column',
    marginBlockStart: '1',
    color: 'foreground.subtle',
    textStyle: 'sm',

    '& dt': {
      srOnly: true
    }
  }),
  right: css({
    flexShrink: '0'
  })
};
