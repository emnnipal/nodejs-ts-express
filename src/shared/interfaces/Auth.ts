import { ValidationChain } from 'express-validator';

export type IMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type IValidator = {
  [method in IMethods]: {
    default: ValidationChain[] | ValidationChain;
    [endpoint: string]: ValidationChain[] | ValidationChain;
  };
};
