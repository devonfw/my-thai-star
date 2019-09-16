import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Booking } from '../../../booking/model/entities/booking.entity';
import { InvitedGuest } from '../../../booking/model/entities/invited-guest.entity';
import { OrderLine } from '../entities/order-line.entity';
import { Order } from '../entities/order.entity';
import { OrderLineCTO } from './order-lineCTO.dto';

/**
 * Class to keep the compatibility with the Java backend.
 *
 * @export
 * @class OrderCTO
 */
export class OrderCTO {
  @Type(() => Booking)
  @ValidateNested()
  readonly booking!: Booking;

  @Type(() => InvitedGuest)
  @ValidateNested()
  readonly invitedGuests?: InvitedGuest[];

  @Type(() => Order)
  @ValidateNested()
  readonly order?: Order;

  @Type(() => OrderLine)
  @ValidateNested()
  readonly orderLines?: OrderLineCTO[];
}
