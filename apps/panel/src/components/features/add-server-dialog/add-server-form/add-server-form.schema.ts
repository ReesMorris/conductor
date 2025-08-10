import { z } from 'zod';

interface SchemaMessages {
  gameTypeRequired: string;
  serverNameRequired: string;
}

/**
 * Schema for add server form validation
 */
export const addServerFormSchema = (messages: SchemaMessages) =>
  z.object({
    gameType: z.string().min(1, messages.gameTypeRequired),
    serverName: z.string().min(1, messages.serverNameRequired),
    domain: z.string().optional()
  });

/**
 * Add server form data type
 */
export type AddServerFormData = z.infer<ReturnType<typeof addServerFormSchema>>;
