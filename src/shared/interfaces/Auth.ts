import { ValidationChain } from 'express-validator';

export type IMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type IValidator = {
  [method in IMethod]: {
    default: ValidationChain[] | ValidationChain;
    [endpoint: string]: ValidationChain[] | ValidationChain;
  };
};
