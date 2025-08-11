export interface WorkspaceSettingsFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  /**
   * The initial data to populate the form.
   */
  initialData: {
    registrationEnabled: boolean;
  };
}
