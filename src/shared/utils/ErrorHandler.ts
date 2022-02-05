import logger from './Logger';

import { HttpResponseType, HttpResponses } from '../constants/Http';

import { Request, Response } from 'express';

import { randomUUID } from 'crypto';

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
    const errorId = randomUUID();
    const user = req?.user || {};
    const endpoint = `${req?.method} ${req?.originalUrl}`;

    if (err instanceof ErrorHandler) {
      const { overrideResponse, ...errResponse } = err;
      const response = {
        ...errResponse,
        ...overrideResponse,
      };
      logger.warn(
        err.message,
        {
          errorId,
          endpoint,
          user,
        },
        response
      );
      res.status(err.statusCode).json(response);
      return;
    }

    const errResponse = HttpResponses[HttpResponseType.ServerError];
    logger.error('Unhandled Error', { errorId, endpoint, user }, req?.body || {}, err);
    // eslint-disable-next-line no-console
    console.error(errorId, err);
    res.status(errResponse.statusCode).json(errResponse);
  }
}

export default ErrorHandler;
