import * as users from './Users';

import { Methods } from '../../interfaces/Http';

export const validate = (method: Methods) => {
  switch (method) {
    case Methods.UserCreate: {
      return users.createValidations;
    }
    default: {
      throw Error('Missing validation schema');
    }
  }
};
