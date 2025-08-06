import { Code, Link, Steps } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';

export const AccessTokenGuide: React.FC = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <Steps.Root aria-label={formatMessage('Railway Setup Steps')}>
      <Steps.Item>
        {formatMessage('Head to the <link>Railway Tokens Page</link>.', {
          link: text => (
            <Link
              target='_blank'
              rel='noopener noreferrer'
              href='https://railway.com/account/tokens'
            >
              {text}
            </Link>
          )
        })}
      </Steps.Item>
      <Steps.Item>
        {formatMessage(
          'Create a new token called <code>Conductor</code>, selecting <strong>No workspace</strong> for the team setting.',
          {
            strong: text => <strong>{text}</strong>,
            code: text => <Code>{text}</Code>
          }
        )}
      </Steps.Item>
      <Steps.Item>
        {formatMessage(
          'Copy the token and paste it into the <strong>Access Token</strong> field below.',
          { strong: text => <strong>{text}</strong> }
        )}
      </Steps.Item>
    </Steps.Root>
  );
};
