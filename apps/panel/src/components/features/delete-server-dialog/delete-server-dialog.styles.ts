import { css } from '@/styled-system/css';

export const styles = {
  alert: css({
    borderRadius: '[0]',
    marginInline: '[calc(var(--dialog-padding) * -1)]',
    borderInlineWidth: '[0]',
    paddingInline: 'var(--dialog-padding)',
    paddingBlock: '6',
    textAlign: 'center'
  }),
  alertActions: css({
    display: 'flex',
    gap: '2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBlockStart: '4'
  }),
  strong: css({
    display: 'block',
    marginBlockEnd: '2',
    fontWeight: 'normal'
  })
};
