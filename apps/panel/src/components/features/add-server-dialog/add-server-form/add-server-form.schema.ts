import { z } from 'zod';

interface SchemaMessages {
  gameTypeRequired: string;
  serverNameRequired: string;
  domainRequired: string;
  proxyPortRequired: string;
  proxyPortInvalid: string;
}

export const connectionTypeSchema = z.enum(['railway', 'domain']);

/**
 * Schema for add server form validation
 */
export const addServerFormSchema = (messages: SchemaMessages) =>
  z
    .object({
      gameType: z.string().min(1, messages.gameTypeRequired),
      serverName: z.string().min(1, messages.serverNameRequired),
      connectionType: connectionTypeSchema,
      domain: z.string().optional(),
      proxyPort: z
        .number({
          message: messages.proxyPortInvalid
        })
        .int()
        .min(1, messages.proxyPortInvalid)
        .max(65535, messages.proxyPortInvalid)
    })
    .refine(
      data => {
        // Validate domain is required for custom domain types
        if (data.connectionType === 'domain') {
          return !!data.domain && data.domain.length > 0;
        }
        return true;
      },
      {
        message: messages.domainRequired,
        path: ['domain']
      }
    );

/**
 * Add server form data type
 */
export type AddServerFormData = z.infer<ReturnType<typeof addServerFormSchema>>;

export type ConnectionType = z.infer<typeof connectionTypeSchema>;
