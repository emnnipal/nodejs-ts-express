import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { api } from './routes/index'
import verifyToken from './helpers/verifyToken'
import * as errorHandler from './helpers/errorHandler'

class App {
  public express: Application

  constructor() {
    this.express = express()
    this.setMiddlewares()
    this.setRoutes()
    this.catchErrors()
  }

  private setMiddlewares(): void {
    this.express.use(cors())
    this.express.use(morgan('dev'))
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(helmet())
    this.express.use(verifyToken)
  }

  private setRoutes(): void {
    this.express.use('/', api)
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }
}

export default new App().express