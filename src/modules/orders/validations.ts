import { z } from 'zod';

export const createOrderSchema = z.object({
  name: z.string().min(1),
});
