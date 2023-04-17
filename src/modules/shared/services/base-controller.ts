import BaseDbService from './base-db-service';

import { StatusCode } from '../constants/http';

import { Request, Response, NextFunction } from 'express';

export interface BaseServiceParams<T> {
  service: BaseDbService<T>;
}

class BaseController<T> {
  protected service: BaseServiceParams<T>['service'];

  constructor({ service }: BaseServiceParams<T>) {
    this.service = service;
  }

  get = (_req: Request, res: Response, next: NextFunction) => {
    try {
      const response = this.service.find();
      res.status(StatusCode.SUCCESS).json(response);
    } catch (err) {
      next(err);
    }
  };

  create = (_req: Request, res: Response, next: NextFunction) => {
    try {
      const response = this.service.create();
      res.status(StatusCode.CREATED).json(response);
    } catch (err) {
      next(err);
    }
  };

  update = (_req: Request, res: Response, next: NextFunction) => {
    try {
      const response = this.service.update();
      res.status(StatusCode.SUCCESS).json(response);
    } catch (err) {
      next(err);
    }
  };

  delete = (_req: Request, res: Response, next: NextFunction) => {
    try {
      const response = this.service.delete();
      res.status(StatusCode.SUCCESS).json(response);
    } catch (err) {
      next(err);
    }
  };
}

export default BaseController;
