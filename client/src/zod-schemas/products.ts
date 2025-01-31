import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, { message: 'Enter a valid name.' }),
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Must be a positive integer',
  }),
  category: z.string().min(2, { message: 'Enter a valid category.' }),
  description: z.string().min(5, { message: 'Enter a valid description.' }),
  image_url: z.string().url({ message: 'Upload a proper image' }),
  stock: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Must be a positive integer',
  }),
});
export type ProductSchemaType = z.infer<typeof productSchema>;
