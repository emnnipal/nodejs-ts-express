import { APP_VERSION } from '../shared/environment';

import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api2Cart Service',
      version: APP_VERSION,
    },
  },
  apis: ['src/controllers/**/*.ts', 'src/modules/**/*.ts'], // files containing OpenAPI specifications
};

export const openApiSchema = swaggerJsdoc(options);

/**
 * @openapi
 * components:
 *  securitySchemes:
 *    auth-token:
 *      type: apiKey
 *      name: x-auth-token
 *      in: header
 *      description: Your JWT
 *  responses:
 *    BadRequest:
 *      description: Bad request response
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                path:
 *                  type: array
 *                  items:
 *                    type: string
 *                type:
 *                   type: string
 *                context:
 *                  type: object
 */
