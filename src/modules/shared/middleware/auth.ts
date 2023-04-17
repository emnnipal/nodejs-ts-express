import { StatusCode } from '../constants/http';
import { APP_AUTH_TOKEN } from '../environment';

import { NextFunction, Request, Response } from 'express';

class AuthMiddleware {
  static verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token') || '';

    if (token !== APP_AUTH_TOKEN) {
      req.log.warn('Invalid auth token', token);
      res.status(StatusCode.UNAUTHORIZED);
      res.json({ message: 'Invalid auth token' });
      return;
    }

    next();
  };
}

export default AuthMiddleware;
