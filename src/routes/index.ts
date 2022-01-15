import { usersRoute } from './Users';

import AuthMiddleware from '../shared/middlewares/Auth';

import { Router } from 'express';

export const routes: Router = Router();

routes.use('/users', AuthMiddleware.verifyToken, usersRoute);
