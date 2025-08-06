import { Field, Input } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import type { ProjectIdFieldProps } from './project-id-field.types';

export const ProjectIdField: React.FC<ProjectIdFieldProps> = ({ data }) => {
  const { formatMessage } = useFormatMessage();

  return (
    <Field
      label={formatMessage('Project ID')}
      helpText={
        data?.projectId
          ? formatMessage(
              'This is detected from your Project Token and cannot be changed'
            )
          : formatMessage('This will be detected from your Project Token')
      }
    >
      <Input
        placeholder='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
        value={data?.projectId ?? ''}
        readOnly
        disabled
      />
    </Field>
  );
};
