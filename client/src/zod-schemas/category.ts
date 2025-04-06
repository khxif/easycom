import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(2, { message: 'Enter a valid name' }),
  description: z.string().min(5, {
    message: 'Enter a valid description',
  }),
});
export type CategorySchemaType = z.infer<typeof categorySchema>;
