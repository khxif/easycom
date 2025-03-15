import { z } from 'zod';

export const searchSchema = z.object({
  name: z.string().optional(),
});
export type SearchSchemaType = z.infer<typeof searchSchema>;
