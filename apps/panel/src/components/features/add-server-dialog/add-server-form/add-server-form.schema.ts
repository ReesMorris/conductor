import { z } from 'zod';

interface SchemaMessages {
  gameTypeRequired: string;
  invalidGameType: string;
}

/**
 * Schema for add server form validation
 */
export const addServerFormSchema = (messages: SchemaMessages) =>
  z.object({
    gameType: z
      .string()
      .min(1, messages.gameTypeRequired)
      .refine(value => ['minecraft', 'ark', 'rust'].includes(value), {
        message: messages.invalidGameType
      })
  });

/**
 * Add server form data type
 */
export type AddServerFormData = z.infer<ReturnType<typeof addServerFormSchema>>;
