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
    method: 'POST',
    originalUrl: '/users',
    body: {
      value: 'test',
    },
    user: { id: 'test' },
  } as Request & { user: { id: string } };

  const mockEndpoint = `${mockRequest.method} ${mockRequest.originalUrl}`;
  const mockErrorDetails = {
    errorId: expect.any(String),
    endpoint: mockEndpoint,
    user: mockRequest.user,
  };

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
        mockErrorDetails,
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

      expect(logger.warn).toHaveBeenCalledWith(mockError, mockErrorDetails, mockJSONResponse);

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
        mockErrorDetails,
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
        mockErrorDetails,
        mockRequest.body,
        mockError
      );
      expect(errLoggerSpy).toHaveBeenCalledWith(expect.any(String), mockError);

      const errResponse = HttpResponses[HttpResponseType.ServerError];
      expect(mockStatus).toHaveBeenCalledWith(errResponse.statusCode);
      expect(mockJSON).toHaveBeenCalledWith(errResponse);
    });

    it('should able to log unknown requests', () => {
      const mockError = new Error();
      const mockData = undefined;

      ErrorHandler.processError(mockError, mockData as unknown as Request, mockResponse);

      expect(errLoggerSpy).toHaveBeenCalledWith(expect.any(String), mockError);

      expect(logger.error).toHaveBeenCalledWith(
        'Unhandled Error',
        {
          ...mockErrorDetails,
          endpoint: expect.any(String),
          user: expect.any(Object),
        },
        expect.any(Object),
        mockError
      );
    });
  });
});
