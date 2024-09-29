import { z } from 'zod';

export const SignInFormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email format',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;

export const SignUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirm_password: z.string(),
});

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;
