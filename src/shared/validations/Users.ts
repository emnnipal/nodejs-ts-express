import { body } from 'express-validator';

export const createValidations = [
  body('email').exists().withMessage('email is required'),
  body('name').exists(),
  body('dphConfig.pickupDetails.address').optional(),
];
