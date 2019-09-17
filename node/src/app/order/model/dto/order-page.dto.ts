import { classToPlain, plainToClass } from 'class-transformer';
import { Page } from '../../../shared/model/dto/page.dto';
import { Pageable } from '../../../shared/model/dto/pageable.dto';
import { Order } from '../entities/order.entity';
import { OrderLineCTO } from './order-lineCTO.dto';
import { OrderCTO } from './orderCTO.dto';

// This transformation is a strange thing that we need to do in order to be compatible
// with the java backend
export class OrderPage extends Page<OrderCTO> {
  static fromOrders(
    totalElements: number,
    pageable: Pageable,
    orders: Order[],
  ) {
    return plainToClass(OrderPage, {
      totalElements,
      pageable,
      content: orders.map(order => {
        return {
          booking:
            order &&
            order.booking &&
            classToPlain(order.booking, {
              excludeExtraneousValues: true,
            }),
          table:
            order.booking &&
            order.booking.table &&
            classToPlain(order.booking.table),
          invitedGuests:
            order.booking &&
            order.booking.invitedGuests &&
            classToPlain(order.booking.invitedGuests),
          order:
            order &&
            classToPlain(order, {
              excludeExtraneousValues: true,
            }),
          orderLines:
            order.orderLines &&
            order.orderLines.map(element =>
              OrderLineCTO.fromOrderLine(element),
            ),
          user:
            order.booking &&
            order.booking.user &&
            classToPlain(order.booking.user),
        };
      }),
    });
  }
}
