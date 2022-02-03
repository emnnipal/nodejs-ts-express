import createServer from '../App';
import { HttpResponses, HttpResponseType } from '../shared/constants/Http';

import { Application, NextFunction, Request, Response } from 'express';
import supertest from 'supertest';

jest.mock('morgan', () =>
  jest.fn().mockImplementation(() => (req: Request, res: Response, next: NextFunction) => {
    next();
  })
);

describe('App', () => {
  let app: Application;

  beforeAll(() => {
    app = createServer();
  });

  describe('common routes', () => {
    it('should be able to run health route', async () => {
      const { text } = await supertest(app).get('/api/health').expect(200);
      expect(text).toBe('OK!');
    });

    describe('given an invalid endpoint', () => {
      it('should return status 404', async () => {
        const mockResult = HttpResponses[HttpResponseType.NotFound];
        const { body } = await supertest(app).get('/nonExistingRoute').expect(404);
        expect(body).toStrictEqual(mockResult);
      });
    });
  });
});
