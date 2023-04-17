import { z } from 'zod';

export const baseShopSchema = z.object({
  shopName: z.string().min(1).trim(),
  shopUrl: z.string().min(1).url().trim(),
});

export type BaseShopType = z.infer<typeof baseShopSchema>;

const castToNumber = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((val) => (typeof val === 'string' ? Number(val) : val), schema);

export const getManySchema = z.object({
  filters: z.object({}),
  search: z.string().optional(),
  page: castToNumber(z.number().min(1).default(1).optional()),
  pageSize: castToNumber(z.number().min(1).default(5).optional()),
});

export const getCountSchema = getManySchema.pick({ filters: true, search: true });
