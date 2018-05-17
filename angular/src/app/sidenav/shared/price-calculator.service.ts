import { Injectable } from '@angular/core';

import { ExtraView, OrderView, OrderViewResult } from '../../shared/viewModels/interfaces';
import { reduce, chain } from 'lodash';

@Injectable()
export class PriceCalculatorService {

  getPrice(order: OrderView | OrderViewResult): number {
    const extrasPrice: number = chain(<ExtraView[]>order.extras)
      .reduce((total: number, extra: ExtraView): number => total + extra.price, 0)
      .value();

    return (order.dish.price + extrasPrice) * order.orderLine.amount;
  }

  getTotalPrice(orders: OrderView[]): number {
    return reduce(orders, (sum: number, order: OrderView): number => sum + this.getPrice(order), 0);
  }

}
