import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone_number: z.string().min(10).max(10),
  profile_picture: z.string().url().optional(),
});
export type ProfileSchemaType = z.infer<typeof profileSchema>;
