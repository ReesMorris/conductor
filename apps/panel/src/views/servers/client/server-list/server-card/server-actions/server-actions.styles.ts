import { css } from '@/styled-system/css';

export const styles = {
  footer: css({
    display: 'flex',
    gap: '2'
  }),
  deleteButton: css({
    backgroundColor: 'transparent',
    borderColor: 'red.900/30',
    backdropBlur: '[none]'
  }),
  manageButton: css({
    flexGrow: 1,
    color: 'purple.900',
    backgroundColor: 'purple.900/10',
    borderColor: 'purple.900/20',
    backdropBlur: '[none]'
  })
};
