import { logger } from './Logger';

import { HttpResponseType, HttpResponses } from '../constants/Http';

import { Request, Response } from 'express';

class ErrorHandler<T = unknown> extends Error {
  public message: string;

  public statusCode: number;

  public code: number;

  public overrideResponse?: T | null;

  constructor(type: HttpResponseType, overrideResponse?: T) {
    super();
    const error = HttpResponses[type];
    const customMessage = typeof overrideResponse === 'string' ? overrideResponse : '';
    this.message = customMessage || error.message;
    this.statusCode = error.statusCode;
    this.code = error.code;
    this.statusCode = error.statusCode;
    this.overrideResponse = typeof overrideResponse === 'object' ? overrideResponse : null;
  }

  static processError<Err>(err: ErrorHandler<Err> | Error, req: Request, res: Response) {
    if (err instanceof ErrorHandler) {
      const { overrideResponse, ...errResponse } = err;
      const response = {
        ...errResponse,
        ...overrideResponse,
      };
      logger.info('Error', response, {
        user: {},
        stack: err.stack?.split(/\n/).slice(1, 4) || [],
      });
      res.status(err.statusCode).json(response);
      return;
    }

    const errResponse = HttpResponses[HttpResponseType.ServerError];
    logger.error('Unhandled error', { user: {} }, req?.body || {}, err);
    res.status(errResponse.statusCode).json(errResponse);
  }
}

export default ErrorHandler;
