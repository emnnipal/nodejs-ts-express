import UsersController from '../controllers/Users';
import { Methods } from '../interfaces/Http';
import AuthMiddleware from '../shared/middlewares/Auth';

import { Router } from 'express';

const usersRoute: Router = Router();

usersRoute.get('/', AuthMiddleware.verifyRequest(Methods.UserGet), UsersController.get);
usersRoute.post('/', AuthMiddleware.verifyRequest(Methods.UserCreate), UsersController.create);

export default usersRoute;
