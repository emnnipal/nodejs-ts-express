import { HttpResponses } from '../constants/Http';
import logger from '../utils/Logger';

import { NextFunction, Request, Response } from 'express';

class AppMiddleware {
  static notFound = (_: Request, res: Response): void => {
    res.status(404);
    res.json(HttpResponses.notFound);
    res.end();
  };

  static healthCheck = (_: Request, res: Response): void => {
    res.status(200).send('OK!');
  };

  static syntaxError = (err: SyntaxError, _: Request, res: Response, next: NextFunction): void => {
    if (err instanceof SyntaxError && 'body' in err) {
      logger.warn(err);
      const result = HttpResponses.badRequest;
      res.status(result.statusCode).send({
        ...result,
        message: 'Syntax Error. Check your request body.',
      });
      return;
    }
    next();
  };
}

export default AppMiddleware;
