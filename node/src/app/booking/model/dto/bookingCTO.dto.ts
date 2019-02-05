import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { OrderLineCTO } from '../../../order/model/dto/order-lineCTO.dto';
import { OrderLine } from '../../../order/model/entities/order-line.entity';
import { Order } from '../../../order/model/entities/order.entity';
import { User } from '../../../user/model/entity/user.entity';
import { Booking } from '../entities/booking.entity';
import { InvitedGuest } from '../entities/invited-guest.entity';
import { Table } from '../entities/table.entity';

/**
 * Class to keep the compatibility with the Java backend.
 *
 * @export
 * @class BookingCTO
 */
export class BookingCTO {
  @Type(() => Booking)
  @ValidateNested()
  readonly booking!: Booking;

  @Type(() => Table)
  @ValidateNested()
  readonly table?: Table;

  @Type(() => InvitedGuest)
  @ValidateNested()
  readonly invitedGuests?: InvitedGuest[];

  @Type(() => Order)
  @ValidateNested()
  readonly order?: Order;

  @Type(() => OrderLine)
  @ValidateNested()
  readonly orders?: OrderLineCTO[];

  @Type(() => User)
  @ValidateNested()
  readonly user?: User;
}
