import { z } from 'zod';

/**
 * Schema for workspace settings form validation
 */
export const workspaceSettingsSchema = () =>
  z.object({
    registrationEnabled: z.boolean()
  });

/**
 * Workspace settings form data type
 */
export type WorkspaceSettingsFormData = z.infer<
  ReturnType<typeof workspaceSettingsSchema>
>;
