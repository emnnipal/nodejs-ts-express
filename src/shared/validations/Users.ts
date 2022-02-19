import { IValidator } from '../interfaces/Auth';
import { RequireAtLeastOne } from '../interfaces/Common';

import Joi from 'joi';

// Change to Joi JS
const UsersValidations: RequireAtLeastOne<IValidator> = {
  POST: {
    default: Joi.object({
      body: Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        details: Joi.object({
          address: Joi.string().required(),
        }).required(),
      }).required(),
    }),
  },
  GET: {
    default: Joi.object({
      query: Joi.object({
        id: Joi.string().uuid().required(),
      }).required(),
    }),
  },
};

export default UsersValidations;
