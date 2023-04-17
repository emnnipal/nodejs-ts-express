import BaseDbService from '../../shared/services/base-db-service';
import { OrdersType } from '../types';

class Service extends BaseDbService<OrdersType> {
  constructor() {
    super({
      schema: undefined, // add some config here
    });
  }
}

const OrderDbService = new Service();

export default OrderDbService;
