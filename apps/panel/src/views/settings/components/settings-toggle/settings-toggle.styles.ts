import { css } from '@/styled-system/css';

export const styles = {
  container: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2'
  }),
  description: css({
    color: 'foreground.subtle',
    textStyle: 'xs'
  })
};
