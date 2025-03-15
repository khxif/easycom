import { z } from 'zod';

export const filterQuery = z.object({
  name: z.string().optional(),
  limit: z.number().int().positive().default(10),
});
export type FilterQueryType = z.infer<typeof filterQuery>;
