import { z } from 'zod';

interface SchemaMessages {
  invalidProjectToken: string;
}

/**
 * Schema for project settings form validation
 */
export const projectSettingsSchema = (messages: SchemaMessages) =>
  z.object({
    projectToken: z
      .uuidv4({
        message: messages.invalidProjectToken
      })
      .or(z.literal(''))
  });

/**
 * Project settings form data type
 */
export type ProjectSettingsFormData = z.infer<
  ReturnType<typeof projectSettingsSchema>
>;
