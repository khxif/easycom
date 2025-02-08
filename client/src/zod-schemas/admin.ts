import { z } from 'zod';

export const adminSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone_number: z.string().min(10),
  profile_picture: z.string().url().optional(),
  role: z.enum(['super-admin', 'admin']),
});
export type AdminSchemaType = z.infer<typeof adminSchema>;
