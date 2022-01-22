import { body, query, ValidationChain } from 'express-validator';

const UsersValidations: { [key: string]: ValidationChain[] } = {
  get: [query('id').exists().withMessage('Missing user id')],
  create: [
    body('email').exists().withMessage('email is required'),
    body('name').exists(),
    body('details.address').exists(),
  ],
};

export default UsersValidations;
