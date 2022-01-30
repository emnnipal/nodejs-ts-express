import { routes } from './routes';
import APIMiddleware from './shared/middlewares/Api';
import morganMiddleware from './shared/middlewares/Morgan';

import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';

class App {
  public express: Application;

  constructor() {
    this.express = express();
    this.setHealthChecker();
    this.setMiddlewares();
    this.setRoutes();
  }

  private setMiddlewares(): void {
    this.express.use(
      cors({
        origin: (_, callback) => callback(null, true),
      })
    );

    this.express.use(morganMiddleware);
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
  }

  private setRoutes(): void {
    this.express.use('/api', routes);
    this.express.use('*', APIMiddleware.notFound);
  }

  private setHealthChecker(): void {
    this.express.use('/api/health', APIMiddleware.healthCheck);
  }
}

export default new App().express;
