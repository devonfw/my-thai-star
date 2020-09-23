import { Injectable } from '@angular/core';
import { chain, reduce } from 'lodash';
import {
  ExtraView,
  OrderView,
  OrderViewResult,
} from '../../shared/view-models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PriceCalculatorService {
  constructor() {}

  getPrice(order: OrderView | OrderViewResult): number {
    const extrasPrice: number = chain(order.extras as ExtraView[])
      .reduce(
        (total: number, extra: ExtraView): number => total + extra.price,
        0,
      )
      .value();

    return (order.dish.price + extrasPrice) * order.orderLine.amount;
  }

  getTotalPrice(orders: OrderView[]): number {
    return reduce(
      orders,
      (sum: number, order: OrderView): number => sum + this.getPrice(order),
      0,
    );
  }
}
