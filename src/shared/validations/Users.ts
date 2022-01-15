import { body, query } from 'express-validator';

export const createValidations = [
  body('email').exists().withMessage('email is required'),
  body('name').exists(),
  body('dphConfig.pickupDetails.address').optional(),
];

export const getValidations = [query('id').exists().withMessage('Missing user id')];
