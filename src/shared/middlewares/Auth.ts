import { HttpResponseType } from '../constants/Http';
import { IMethods } from '../interfaces/Auth';
import ErrorHandler from '../utils/ErrorHandler';
import { validate } from '../validations';

import { NextFunction, Request, Response } from 'express';

class AuthMiddleware {
  static verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
      next();
    } catch (err) {
      ErrorHandler.processError(err as Error, req, res);
    }
  };

  static verifyRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { body, query } = req;
    try {
      const schema = validate(req.method as IMethods, `${req.baseUrl}${req.route.path}`);

      if (schema) {
        const transformed = await schema
          .validateAsync(
            {
              ...(body && { body }),
              ...(query && { query }),
            },
            {
              abortEarly: false,
              stripUnknown: true,
            }
          )
          .catch((error) => {
            throw new ErrorHandler(HttpResponseType.BadRequest, {
              errors: error.details,
            });
          });

        req.body = transformed?.body || {};
        req.query = transformed?.query || {};
      }

      next();
    } catch (err) {
      ErrorHandler.processError(err as ErrorHandler, req, res);
    }
  };
}

export default AuthMiddleware;
