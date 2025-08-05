import type { RailwayResponse } from '@conductor/api';

export interface ProjectSettingsFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  /**
   * The initial data to populate the form.
   */
  initialData: RailwayResponse;
}
