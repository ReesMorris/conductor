import z from 'zod';

export const pageSchema = {
  params: z.object({}),
  searchParams: z.object({
    token: z.string().catch(''),
    error: z.literal('invalid_token').optional().catch('invalid_token')
  })
};
