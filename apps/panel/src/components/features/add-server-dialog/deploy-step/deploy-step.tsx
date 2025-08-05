import { Code, Steps } from '@/components/ui';
import { APP_NAME, TEMPLATE_PREFIX } from '@/constants';
import { useFormatMessage } from '@/i18n/format-message';

export const DeployStep = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <Steps.Root
      aria-label={formatMessage('Instructions to deploy your server template')}
    >
      <Steps.Item>
        {formatMessage(
          'Go to the Railway project where {appName} is deployed',
          { appName: APP_NAME }
        )}
      </Steps.Item>
      <Steps.Item>
        {formatMessage(
          'Right-click on the canvas and click on <strong>Template</strong>',
          { strong: text => <strong>{text}</strong> }
        )}
      </Steps.Item>
      <Steps.Item>
        {formatMessage('Search for <code>{templateName}</code>', {
          code: text => <Code>{text}</Code>,
          templateName: `${TEMPLATE_PREFIX}server-template`
        })}
      </Steps.Item>
      <Steps.Item>
        {formatMessage('Click on it, then <strong>Deploy Template</strong>', {
          strong: text => <strong>{text}</strong>
        })}
      </Steps.Item>
    </Steps.Root>
  );
};
