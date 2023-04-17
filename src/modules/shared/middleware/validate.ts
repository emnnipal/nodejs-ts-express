import { StatusCode } from '../constants/http';

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

const validateRequest =
  (schema: ZodSchema, property: 'body' | 'query' | 'params') =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data: Record<string, unknown> = req[property];

    try {
      if (schema) {
        const sanitizedValues = await schema.parseAsync(data);
        req[property] = sanitizedValues;
      }
    } catch (err) {
      const zodError = err as ZodError;

      const endpoint = `${req?.method} ${req?.originalUrl}`;
      req.log.warn('Schema validation', {
        endpoint,
        errors: zodError.errors,
      });

      res.status(StatusCode.UNPROCESSABLE_ENTITY);
      res.json(zodError.errors);
      return;
    }

    next();
  };

export const bodyValidation = (schema: ZodSchema) => validateRequest(schema, 'body');

export const queryValidation = (schema: ZodSchema) => validateRequest(schema, 'query');

export const paramsValidation = (schema: ZodSchema) => validateRequest(schema, 'params');
