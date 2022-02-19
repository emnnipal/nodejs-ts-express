import { IValidator } from '../interfaces/Auth';
import { RequireAtLeastOne } from '../interfaces/Common';

import { body, query } from 'express-validator';

// Change to Joi JS
const UsersValidations: RequireAtLeastOne<IValidator> = {
  POST: {
    default: [
      body('email').exists().withMessage('email is required'),
      body('name').exists(),
      body('details.address').exists(),
    ],
  },
  GET: {
    default: [query('id').exists().withMessage('Missing user id')],
  },
};

export default UsersValidations;
