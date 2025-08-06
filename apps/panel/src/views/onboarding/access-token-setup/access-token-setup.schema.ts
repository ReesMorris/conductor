import z from 'zod';

interface SchemaMessages {
  invalidAccessToken: string;
}

export const accessTokenSetupSchema = (messages: SchemaMessages) =>
  z.object({
    accessToken: z.uuidv4({
      message: messages.invalidAccessToken
    })
  });

export type AccessTokenSetupFormData = z.infer<
  ReturnType<typeof accessTokenSetupSchema>
>;
