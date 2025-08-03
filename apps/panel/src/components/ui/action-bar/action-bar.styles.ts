import { css } from '@/styled-system/css';

export const styles = {
  container: css({
    position: 'fixed',
    insetBlockEnd: '0',
    insetInline: '0',
    zIndex: 'sticky',

    _open: {
      animation: 'action-bar-slide-up',
      transform: 'translateY(0)'
    },

    _closed: {
      animation: 'action-bar-slide-down',
      transform: 'translateY(100%)'
    }
  }),
  content: css({
    backgroundColor: 'glass.light',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'glass.medium',
    padding: '2',
    backdropFilter: 'auto',
    backdropBlur: 'lg',
    boxShadow: 'xs',
    inlineSize: 'fit',
    borderRadius: 'xl',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2',
    marginBlockEnd: '6',
    marginInline: 'auto'
  })
};
