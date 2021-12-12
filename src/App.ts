import { logger } from './utils/logger';

import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

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
      }),
    );
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(helmet());
  }

  private setRoutes(): void {
    logger('test');
  }

  private setHealthChecker(): void {
    this.express.use('/health', (_, res) => res.status(200).send('OK!'));
  }
}

export default new App().express;
