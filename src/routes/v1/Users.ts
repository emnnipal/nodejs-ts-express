import UsersController from '../../controllers/Users';
import AuthMiddleware from '../../shared/middleware/Auth';
import { UserSchemas } from '../../shared/validations/Users';

import { Router } from 'express';

const usersRoute: Router = Router();

usersRoute.get('/', AuthMiddleware.verifyRequest(UserSchemas.get, 'query'), UsersController.get);
usersRoute.post(
  '/',
  AuthMiddleware.verifyRequest(UserSchemas.create, 'body'),
  UsersController.create
);

export default usersRoute;
