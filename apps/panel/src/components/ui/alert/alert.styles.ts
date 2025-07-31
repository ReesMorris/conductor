import { sva } from '@/styled-system/css';

export const styles = sva({
  slots: ['container', 'content', 'icon', 'title', 'description'],
  base: {
    container: {
      color: 'var(--alert-text)',
      backgroundColor: 'var(--alert-bg)',
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: 'var(--alert-border)',
      borderRadius: 'lg',
      padding: '4'
    },
    content: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '3'
    },
    icon: {
      _icon: {
        flexShrink: '0',
        inlineSize: '5',
        blockSize: '5'
      }
    },
    title: {
      fontWeight: 'medium',
      textStyle: 'sm',
      marginBlockEnd: '1',

      _empty: {
        display: 'none'
      }
    },
    description: {
      color: 'var(--alert-description)',
      textStyle: 'sm',
      lineHeight: 'relaxed'
    }
  },
  variants: {
    color: {
      error: {
        container: {
          '--alert-text': '{colors.red.900}',
          '--alert-description': '{colors.red.900}',
          '--alert-bg': '{colors.red.900/10}',
          '--alert-border': '{colors.red.900/20}'
        }
      }
    }
  },
  defaultVariants: {
    color: 'error'
  }
});
