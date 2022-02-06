import { HttpResponseType } from '../constants/Http';
import { IMethods } from '../interfaces/Auth';
import ErrorHandler from '../utils/ErrorHandler';
import { validate } from '../validations';

import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

class AuthMiddleware {
  static verifyToken(req: Request, res: Response, next: NextFunction): void {
    try {
      next();
    } catch (err) {
      ErrorHandler.processError(err as Error, req, res);
    }
  }

  static verifyRequest() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validations = validate(req.method as IMethods, `${req.baseUrl}${req.route.path}`);

        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
          next();
          return;
        }

        throw new ErrorHandler(HttpResponseType.BadRequest, {
          errors: errors.array({ onlyFirstError: true }),
        });
      } catch (err) {
        ErrorHandler.processError(err as Error, req, res);
      }
    };
  }
}

export default AuthMiddleware;
