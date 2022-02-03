import { routes } from './routes';
import APIMiddleware from './shared/middlewares/Api';
import morganMiddleware from './shared/middlewares/Morgan';

import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';

function createServer() {
  const app: Application = express();

  app.use(cors());
  app.use(helmet());
  app.use(morganMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api', routes);
  app.use('/api/health', APIMiddleware.healthCheck);
  app.use('*', APIMiddleware.notFound);

  return app;
}

export default createServer;
