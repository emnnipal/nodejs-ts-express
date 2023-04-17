import ApiMiddleware from './modules/shared/middleware/api';
import morganMiddleware from './modules/shared/middleware/morgan';
import { routes } from './routes';

import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';

function createServer() {
  const app: Application = express();

  app.use(cors());
  app.use(helmet());
  app.use(morganMiddleware);
  app.use(ApiMiddleware.requestId);
  app.use(ApiMiddleware.logHelper);
  app.use(express.json());
  app.use(ApiMiddleware.syntaxError);
  app.use(express.urlencoded({ extended: false }));

  app.use('/api', routes);
  app.use('/api/health', (_, res) => {
    res.status(200).send('OK!');
  });
  app.use('*', ApiMiddleware.notFound);
  app.use(ApiMiddleware.error);

  return app;
}

export default createServer;
