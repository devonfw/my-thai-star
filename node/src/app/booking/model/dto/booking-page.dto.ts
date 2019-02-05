import { classToPlain, plainToClass } from 'class-transformer';
import { Page } from '../../../shared/model/dto/page.dto';
import { Pageable } from '../../../shared/model/dto/pageable.dto';
import { Booking } from '../entities/booking.entity';
import { BookingCTO } from './bookingCTO.dto';
import { OrderLineCTO } from '../../../order/model/dto/order-lineCTO.dto';
import { Order } from '../../../order/model/entities/order.entity';

// This class have the same structure as used for order search, so we use it for both
// This transformation is a strange thing that we need to do in order to be compatible
// with the java backend
export class BookingPage extends Page<BookingCTO> {
  static fromBookings(
    totalElements: number,
    pageable: Pageable,
    bookings: Booking[],
  ) {
    return plainToClass(BookingPage, {
      totalElements,
      pageable,
      content: bookings.map(booking => {
        return {
          booking:
            booking && classToPlain(booking, { excludeExtraneousValues: true }),
          table: booking.table && classToPlain(booking.table),
          invitedGuests:
            booking.invitedGuests && classToPlain(booking.invitedGuests),
          order: booking.order && classToPlain(booking.order),
          orders:
            booking.order &&
            booking.order.orderLines &&
            booking.order.orderLines.map(element =>
              OrderLineCTO.fromOrderLine(element),
            ),
          user: booking.user && classToPlain(booking.user),
        };
      }),
    });
  }
  static fromOrders(
    totalElements: number,
    pageable: Pageable,
    orders: Order[],
  ) {
    return plainToClass(BookingPage, {
      totalElements,
      pageable,
      content: orders.map(order => {
        return {
          booking:
            order &&
            order.booking &&
            classToPlain(order.booking, { excludeExtraneousValues: true }),
          table:
            order.booking &&
            order.booking.table &&
            classToPlain(order.booking.table),
          invitedGuests:
            order.booking &&
            order.booking.invitedGuests &&
            classToPlain(order.booking.invitedGuests),
          order:
            order && classToPlain(order, { excludeExtraneousValues: true }),
          orders:
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
