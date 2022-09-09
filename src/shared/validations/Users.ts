import { z } from 'zod';

export const UserSchemas = {
  create: z.object({
    email: z.string().email().min(1),
    name: z.string().min(1),
    details: z.object({
      address: z.string().min(1),
    }),
  }),
  get: z.object({
    id: z.string().uuid(),
  }),
};

export type CreateUserType = z.infer<typeof UserSchemas.create>;
export type GetUserType = z.infer<typeof UserSchemas.get>;
