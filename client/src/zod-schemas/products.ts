import { z } from 'zod';

export const productSchema = z.object({
	name: z.string().min(2).max(50),
	price: z.string().min(0),
	category: z.string().min(2).max(50),
	description: z.string().min(2).max(1000),
	image_url: z.string().url(),
	stock: z.string().min(0),
});
export type ProductSchemaType = z.infer<typeof productSchema>;