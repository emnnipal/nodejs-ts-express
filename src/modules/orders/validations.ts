import { z } from 'zod';

export const orderSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});
