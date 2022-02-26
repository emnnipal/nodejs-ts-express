import Joi from 'joi';

export type IMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type IValidator = {
  [method in IMethods]: {
    default: Joi.ObjectSchema;
    [endpoint: string]: Joi.ObjectSchema;
  };
};
