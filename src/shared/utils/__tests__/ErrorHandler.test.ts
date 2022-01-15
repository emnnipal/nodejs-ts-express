import 'jest-extended';
import { HttpResponses, HttpResponseType } from '../../constants/Http';
import ErrorHandler from '../ErrorHandler';
import { logger } from '../Logger';

import { Request, Response } from 'express';

const transformErrToJSON = (error: Error) => JSON.parse(JSON.stringify(error));

describe('ErrorHandler', () => {
  const loggerInfoSpy = jest.spyOn(logger, 'info').mockImplementation();
  const loggerErrorSpy = jest.spyOn(logger, 'error').mockImplementation();

  const mockJSON = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({
    json: mockJSON,
  });
  const mockResponse = {
    json: mockJSON,
    status: mockStatus,
  } as unknown as Response;

  const mockRequest = {
    body: {
      value: 'test',
    },
  } as Request;

  const expectedStack = expect.toBeArrayOfSize(3);

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

      expect(loggerInfoSpy).toHaveBeenCalledWith(expect.any(String), mockJSONResponse, {
        user: expect.any(Object),
        stack: expectedStack,
      });

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

      expect(loggerInfoSpy).toHaveBeenCalledWith(expect.any(String), mockJSONResponse, {
        user: expect.any(Object),
        stack: expectedStack,
      });

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

      expect(loggerInfoSpy).toHaveBeenCalledWith(expect.any(String), mockJSONResponse, {
        user: expect.any(Object),
        stack: expectedStack,
      });

      expect(mockStatus).toHaveBeenCalledWith(error.statusCode);
      expect(mockJSON).toHaveBeenCalledWith(mockJSONResponse);
    });
  });

  describe('given unexpected error', () => {
    it('should able to log with details', () => {
      const mockError = new Error('test');
      ErrorHandler.processError(mockError, mockRequest, mockResponse);

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        expect.any(String),
        {
          user: expect.any(Object),
        },
        mockRequest.body,
        mockError
      );

      const errResponse = HttpResponses[HttpResponseType.ServerError];
      expect(mockStatus).toHaveBeenCalledWith(errResponse.statusCode);
      expect(mockJSON).toHaveBeenCalledWith(errResponse);
    });

    it('should able to log untracable error', () => {
      const mockError = new ErrorHandler(HttpResponseType.BadRequest);

      delete mockError.stack;
      ErrorHandler.processError(mockError, mockRequest, mockResponse);

      expect(loggerInfoSpy).toHaveBeenCalledWith(expect.any(String), expect.any(Object), {
        user: expect.any(Object),
        stack: expect.any(Array),
      });
    });

    it('should able to log unknown requests', () => {
      const mockError = new Error();
      const mockData = undefined;

      ErrorHandler.processError(mockError, mockData as unknown as Request, mockResponse);

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.any(Object),
        mockError
      );
    });
  });
});
