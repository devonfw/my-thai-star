import { Injectable } from '@angular/core';

import {
  ExtraView,
  OrderView,
  OrderViewResult,
} from '../../shared/view-models/interfaces';
import { reduce, chain } from 'lodash';

/* @export
 * @class PriceCalculatorService
 */
@Injectable()
export class PriceCalculatorService {
  /* @param {(OrderView | OrderViewResult)} order
   * @returns {number}
   * @memberof PriceCalculatorService
   */
  getPrice(order: OrderView | OrderViewResult): number {
    const extrasPrice: number = chain(<ExtraView[]>order.extras)
      .reduce(
        (total: number, extra: ExtraView): number => total + extra.price,
        0,
      )
      .value();

    return (order.dish.price + extrasPrice) * order.orderLine.amount;
  }

  /* @param {OrderView[]} orders
   * @returns {number}
   * @memberof PriceCalculatorService
   */
  getTotalPrice(orders: OrderView[]): number {
    return reduce(
      orders,
      (sum: number, order: OrderView): number => sum + this.getPrice(order),
      0,
    );
  }
}
