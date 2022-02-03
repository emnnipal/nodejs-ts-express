import { IHttpResponse } from '../interfaces/Http';

export enum HttpResponseType {
  ServerError = 'serverError',
  Success = 'success',
  Created = 'created',
  Updated = 'updated',
  Deleted = 'deleted',
  BadRequest = 'badRequest',
  Unauthorized = 'unauthorized',
  NotFound = 'notFound',
}

export const HttpResponses: { [Key in HttpResponseType]: IHttpResponse } = {
  serverError: {
    message: 'Server Error',
    statusCode: 500,
    code: 0,
  },
  success: {
    message: 'Success',
    statusCode: 200,
    code: 1,
  },
  created: {
    message: 'Created',
    statusCode: 201,
    code: 2,
  },
  updated: {
    message: 'Updated',
    statusCode: 200,
    code: 3,
  },
  deleted: {
    message: 'Deleted',
    statusCode: 200,
    code: 4,
  },
  badRequest: {
    message: 'Bad Request',
    statusCode: 400,
    code: 5,
  },
  unauthorized: {
    message: 'Unauthorized',
    statusCode: 401,
    code: 6,
  },
  notFound: {
    message: 'Not Found',
    statusCode: 404,
    code: 7,
  },
};
