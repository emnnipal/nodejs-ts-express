import OrderDbService from '../modules/orders/services/order-db-service';
import { OrdersType } from '../modules/orders/types';
import BaseController from '../modules/shared/services/base-controller';

class Controller extends BaseController<OrdersType> {
  constructor() {
    super({
      service: OrderDbService,
    });
  }
}

const OrdersController = new Controller();

export default OrdersController;
