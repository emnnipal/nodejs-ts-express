import { ordersRoute } from './modules/orders/routes';
import ApiMiddleware from './modules/shared/middleware/api';
import AuthMiddleware from './modules/shared/middleware/auth';
import { swaggerRoute } from './modules/swagger/route';

import { Router } from 'express';

export const routes: Router = Router();

routes.use(
  '/orders',
  ApiMiddleware.logIncomingRequest,
  AuthMiddleware.verifyAuthToken,
  ordersRoute
);

routes.use('/swagger', swaggerRoute);
