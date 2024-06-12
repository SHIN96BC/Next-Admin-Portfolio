import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string()
    .email('Please provide a valid email.')
    .min(1, 'Please enter your email.')
    .max(255, 'email is too long'),
});

export const passwordSchema = z.object({
  password: z.string()
    // .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&^$])[A-Za-z\d@!%*#?&^$]{8,20}$/,'Please choose a strong password. Try a mix of letters. Numbers and symbol withing 8 to 20 characters.')
    .min(1, 'Please enter your password.')
    .max(255, 'password is too long'),
});

export const submitSchema = z.object({
  submit: z.string().optional(),
});

export const loginSchema = z.object({
  ...emailSchema.shape,
  ...passwordSchema.shape,
  ...submitSchema.shape,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const forgotPwSchema = z.object({
  ...emailSchema.shape,
  ...submitSchema.shape,
});

export type ForgotPwSchemaType = z.infer<typeof forgotPwSchema>;

export const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
  ...emailSchema.shape,
  ...passwordSchema.shape,
  ...submitSchema.shape,
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const passwordConfirmSchema = z.object({
  ...passwordSchema.shape,
  passwordConfirm: z.string()
    .min(1, 'Please enter your password confirm.'),
  ...submitSchema.shape,
}).refine((data) => data.passwordConfirm === data.password, {
  message: 'Your confirmed password does not match',
  path: ['passwordConfirm'],
});

export type PasswordConfirmSchemaType = z.infer<typeof passwordConfirmSchema>;
