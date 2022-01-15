import WebhooksController from '../controllers/Users';

import { Router } from 'express';

export const usersRoute: Router = Router();

usersRoute.get('/', WebhooksController.get);
usersRoute.post('/', WebhooksController.create);
