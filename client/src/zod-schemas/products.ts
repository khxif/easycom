import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, { message: 'Enter a valid name.' }),
  price: z
    .string()
    .min(1, { message: 'Enter a valid price' })
    .transform(v => Number(v) || 0),
  category: z.string().min(2, { message: 'Enter a valid category.' }),
  description: z.string().min(5, { message: 'Enter a valid description.' }),
  image_url: z.string().url({ message: 'Upload a proper image' }),
  stock: z
    .string()
    .min(1, { message: 'Stock must be a number.' })
    .transform(v => Number(v) || 0),
});
export type ProductSchemaType = z.infer<typeof productSchema>;
