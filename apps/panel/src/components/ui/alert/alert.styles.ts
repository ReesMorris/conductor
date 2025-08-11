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
      padding: '3'
    },
    content: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '2.5'
    },
    icon: {
      _icon: {
        flexShrink: '0',
        inlineSize: '4',
        blockSize: '4',
        transform: 'translateY(3px)'
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
          '--alert-bg': '{colors.red.900/5}',
          '--alert-border': '{colors.red.900/15}'
        }
      },
      warning: {
        container: {
          '--alert-text': '{colors.yellow.900}',
          '--alert-description': '{colors.yellow.900}',
          '--alert-bg': '{colors.yellow.900/10}',
          '--alert-border': '{colors.yellow.900/20}'
        }
      },
      success: {
        container: {
          '--alert-text': '{colors.green.900}',
          '--alert-description': '{colors.green.900}',
          '--alert-bg': '{colors.green.900/10}',
          '--alert-border': '{colors.green.900/20}'
        }
      }
    }
  },
  defaultVariants: {
    color: 'error'
  }
});
