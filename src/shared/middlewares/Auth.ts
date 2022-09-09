import { HttpResponseType } from '../constants/Http';
import ErrorHandler from '../utils/ErrorHandler';

import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

class AuthMiddleware {
  static verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
      next();
    } catch (err) {
      ErrorHandler.processError(err as Error, req, res);
    }
  };

  static verifyRequest =
    (schema: ZodSchema, property: 'body' | 'query') =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (schema) {
          const data: Record<string, unknown> = req[property];
          const sanitizedValues = await schema.parseAsync(data).catch((err: ZodError) => {
            throw new ErrorHandler(HttpResponseType.BadRequest, {
              errors: err.errors,
            });
          });

          req[property] = sanitizedValues;
        }

        next();
      } catch (err) {
        ErrorHandler.processError(err as ErrorHandler, req, res);
      }
    };
}

export default AuthMiddleware;
