import usersRoute from './Users';

import AuthMiddleware from '../../shared/middlewares/Auth';

import { Router } from 'express';

const v1Routes: Router = Router();

v1Routes.use('/users', AuthMiddleware.verifyToken, usersRoute);

export default v1Routes;
