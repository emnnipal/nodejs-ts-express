import OrderDbService from '../modules/orders/services/order-db-service';
import { OrdersType } from '../modules/orders/types';
import BaseController from '../modules/shared/services/base-controller';

class Controller extends BaseController<OrdersType> {
  constructor() {
    super({
      service: OrderDbService,
    });
  }

  /**
   * @openapi
   * /api/orders:
   *  post:
   *    description: Create order
   *    tags:
   *      - Order
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              name:
   *                type: string
   *                description: Name of the order
   *                example: Order 1
   *                required: true
   *                minLength: 1
   *                maxLength: 255
   *
   *    responses:
   *      200:
   *        description: Success response
   *      400:
   *        $ref: '#/components/responses/BadRequest'
   *    security:
   *      - auth-token: []
   */
  // create
}

const OrdersController = new Controller();

export default OrdersController;
