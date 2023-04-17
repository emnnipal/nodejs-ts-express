import { openApiSchema } from './service';

import { SWAGGER_PASSWORD, SWAGGER_USERNAME } from '../shared/environment';

import { Router } from 'express';
import basicAuth from 'express-basic-auth';
import swaggerUi from 'swagger-ui-express';

export const swaggerRoute: Router = Router();

swaggerRoute.use(
  '/',
  basicAuth({
    users: { [SWAGGER_USERNAME]: SWAGGER_PASSWORD },
    challenge: true,
  }),
  swaggerUi.serve,
  swaggerUi.setup(openApiSchema, {
    customCss: '.swagger-ui .topbar { display: none }',
  })
);
