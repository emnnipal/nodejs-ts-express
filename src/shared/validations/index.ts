import UsersValidations from './Users';

import { IMethod } from '../interfaces/Auth';

import { ValidationChain } from 'express-validator';
import get from 'lodash/get';

export const Validators = {
  v1: {
    users: UsersValidations,
  },
};

export const validate = (method: IMethod, originalUrl: string) => {
  const {
    1: apiVersion,
    2: entity,
    3: action = 'default',
  } = originalUrl.split('/').filter((item) => item);

  const validator = get(Validators, [apiVersion, entity, method, action]);

  if (!validator) {
    throw Error('Missing validation schema');
  }

  return validator as ValidationChain[];
};
