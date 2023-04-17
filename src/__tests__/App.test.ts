import createServer from '../app';
import { StatusCode } from '../modules/shared/constants/http';

import { Application, NextFunction, Request, Response } from 'express';
import supertest from 'supertest';
import { beforeAll, describe, expect, it, vi } from 'vitest';

vi.mock('morgan', () => ({
  default: () => (_req: Request, _res: Response, next: NextFunction) => {
    next();
  },
}));

describe('App', () => {
  let app: Application;

  beforeAll(() => {
    app = createServer();
  });

  describe('common routes', () => {
    it('should be able to run health route', async () => {
      const { text } = await supertest(app).get('/api/health').expect(StatusCode.SUCCESS);
      expect(text).toBe('OK!');
    });

    describe('given an invalid endpoint', () => {
      it('should return status 404', async () => {
        const { body } = await supertest(app).get('/nonExistingRoute').expect(StatusCode.NOT_FOUND);
        expect(body).toStrictEqual({
          message: 'Requested Resource Not Found',
        });
      });
    });
  });
});
