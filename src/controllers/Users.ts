import { HttpResponses } from '../shared/constants/Http';
import ErrorHandler from '../shared/utils/ErrorHandler';

import { Request, Response } from 'express';

class UsersController {
  static get = (req: Request, res: Response): void => {
    try {
      res.status(200).json(HttpResponses.success);
    } catch (err) {
      ErrorHandler.processError(err as Error, req, res);
    }
  };

  static create = (req: Request, res: Response): void => {
    try {
      res.status(200).json(HttpResponses.success);
    } catch (err) {
      ErrorHandler.processError(err as Error, req, res);
    }
  };
}

export default UsersController;
