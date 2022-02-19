import { routes } from './routes';
import AppMiddleware from './shared/middlewares/App';
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
  app.use(AppMiddleware.syntaxError);
  app.use(express.urlencoded({ extended: false }));

  app.use('/api', routes);
  app.use('/api/health', AppMiddleware.healthCheck);
  app.use('*', AppMiddleware.notFound);

  return app;
}

export default createServer;
