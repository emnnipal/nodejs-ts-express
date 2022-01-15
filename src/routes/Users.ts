import WebhooksController from '../controllers/Users';
import { Methods } from '../interfaces/Http';
import AuthMiddleware from '../shared/middlewares/Auth';

import { Router } from 'express';

export const usersRoute: Router = Router();

usersRoute.get('/', AuthMiddleware.verifyRequest(Methods.UserGet), WebhooksController.get);
usersRoute.post('/', AuthMiddleware.verifyRequest(Methods.UserCreate), WebhooksController.create);
