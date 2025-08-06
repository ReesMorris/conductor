import { z } from 'zod';

interface SchemaMessages {
  invalidAccessToken: string;
}

/**
 * Schema for project settings form validation
 */
export const projectSettingsSchema = (messages: SchemaMessages) =>
  z.object({
    accessToken: z
      .uuidv4({
        message: messages.invalidAccessToken
      })
      .or(z.literal(''))
  });

/**
 * Project settings form data type
 */
export type ProjectSettingsFormData = z.infer<
  ReturnType<typeof projectSettingsSchema>
>;
