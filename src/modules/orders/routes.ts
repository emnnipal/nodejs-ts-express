import { orderSchema } from './validations';

import OrdersController from '../../controllers/orders';
import AuthMiddleware from '../shared/middleware/auth';
import { bodyValidation } from '../shared/middleware/validate';

import { Router } from 'express';

export const ordersRoute: Router = Router();

ordersRoute.post(
  '/',
  AuthMiddleware.verifyAuthToken,
  bodyValidation(orderSchema),
  OrdersController.create
);
