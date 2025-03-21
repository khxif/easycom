import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid Email!' }).max(50),
  password: z.string().min(5, {
    message: 'Password must be at least 5 characters long',
  }),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long',
  }),
  email: z.string().email({ message: 'Enter a valid Email!' }).max(50),
  password: z.string().min(5, {
    message: 'Password must be at least 5 characters long',
  }),
  phone_number: z.string().min(10, {
    message: 'Enter a valid Phone Number!',
  }),
});
export type SignupSchemaType = z.infer<typeof signupSchema>;
