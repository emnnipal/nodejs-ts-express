import UsersValidations from './Users';

import { Methods } from '../../interfaces/Http';

export const validate = (method: Methods) => {
  const [entity, action] = method.split('.');
  switch (entity) {
    case 'users':
      return UsersValidations[action];
    default: {
      throw Error('Missing validation schema');
    }
  }
};
