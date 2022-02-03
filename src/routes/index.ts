import v1Routes from './v1';

import { Router } from 'express';

export const routes: Router = Router();

routes.use('/v1', v1Routes);
