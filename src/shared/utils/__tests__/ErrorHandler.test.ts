import 'jest-extended';
import { HttpResponses, HttpResponseType } from '../../constants/Http';
import ErrorHandler from '../ErrorHandler';
import logger from '../Logger';

import { Request, Response } from 'express';

const transformErrToJSON = (error: Error) => JSON.parse(JSON.stringify(error));

jest.mock('../Logger');

describe('ErrorHandler', () => {
  const errLoggerSpy = jest.spyOn(console, 'error').mockImplementation();
  const mockJSON = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({
    json: mockJSON,
  });
  const mockResponse = {
    json: mockJSON,
    status: mockStatus,
  } as unknown as Response;

  const mockRequest = {
    originalUrl: '/users',
    body: {
      value: 'test',
    },
  } as Request;

  describe('given no override value', () => {
    it.each(Object.values(HttpResponseType))(`should throw without crashing - %s`, (value) => {
      const mockJSONResponse = HttpResponses[value];
      const error = new ErrorHandler(value);

      ErrorHandler.processError(error, mockRequest, mockResponse);

      expect(error).toBeInstanceOf(ErrorHandler);
      expect(transformErrToJSON(error)).toStrictEqual({
        ...HttpResponses[value],
        overrideResponse: null,
      });

      expect(logger.warn).toHaveBeenCalledWith(
        mockJSONResponse.message,
        {
          endpoint: mockRequest.originalUrl,
          user: expect.any(Object),
        },
        mockJSONResponse
      );

      expect(mockStatus).toHaveBeenCalledWith(error.statusCode);
      expect(mockJSON).toHaveBeenCalledWith(mockJSONResponse);
    });
  });

  describe('given with string override value', () => {
    it.each(Object.values(HttpResponseType))(`should use the override value - %s`, (value) => {
      const mockError = 'test';
      const mockJSONResponse = {
        ...HttpResponses[value],
        message: mockError,
      };

      const error = new ErrorHandler(value, mockError);

      ErrorHandler.processError(error, mockRequest, mockResponse);

      expect(error).toBeInstanceOf(ErrorHandler);
      expect(transformErrToJSON(error)).toStrictEqual({
        ...mockJSONResponse,
        overrideResponse: null,
      });

      expect(logger.warn).toHaveBeenCalledWith(
        mockError,
        {
          endpoint: mockRequest.originalUrl,
          user: expect.any(Object),
        },
        mockJSONResponse
      );

      expect(mockStatus).toHaveBeenCalledWith(error.statusCode);
      expect(mockJSON).toHaveBeenCalledWith(mockJSONResponse);
    });
  });

  describe('given with object override value', () => {
    it.each(Object.values(HttpResponseType))(`should use the override value - %s`, (value) => {
      const mockError = { error: 'test' };
      const mockJSONResponse = {
        ...HttpResponses[value],
        ...mockError,
      };
      const error = new ErrorHandler(value, mockError);

      ErrorHandler.processError(error, mockRequest, mockResponse);

      expect(error).toBeInstanceOf(ErrorHandler);
      expect(transformErrToJSON(error)).toStrictEqual({
        ...HttpResponses[value],
        overrideResponse: mockError,
      });

      expect(logger.warn).toHaveBeenCalledWith(
        mockJSONResponse.message,
        {
          endpoint: mockRequest.originalUrl,
          user: expect.any(Object),
        },
        mockJSONResponse
      );

      expect(mockStatus).toHaveBeenCalledWith(error.statusCode);
      expect(mockJSON).toHaveBeenCalledWith(mockJSONResponse);
    });
  });

  describe('given unexpected error', () => {
    it('should able to log with details', () => {
      const mockError = new Error('test');
      ErrorHandler.processError(mockError, mockRequest, mockResponse);

      expect(logger.error).toHaveBeenCalledWith(
        'Unhandled Error',
        {
          endpoint: mockRequest.originalUrl,
          user: expect.any(Object),
        },
        mockRequest.body,
        mockError
      );
      expect(errLoggerSpy).toHaveBeenCalledWith(mockError);

      const errResponse = HttpResponses[HttpResponseType.ServerError];
      expect(mockStatus).toHaveBeenCalledWith(errResponse.statusCode);
      expect(mockJSON).toHaveBeenCalledWith(errResponse);
    });
  });
});
