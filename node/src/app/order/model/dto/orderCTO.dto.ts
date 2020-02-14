import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Booking } from '../../../booking/model/entities/booking.entity';
import { InvitedGuest } from '../../../booking/model/entities/invited-guest.entity';
import { OrderLine } from '../entities/order-line.entity';
import { Order } from '../entities/order.entity';
import { OrderLineCTO } from './order-lineCTO.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Class to keep the compatibility with the Java backend.
 *
 * @export
 * @class OrderCTO
 */
export class OrderCTO {
  @Type(() => Booking)
  @ApiProperty({ type: () => Booking })
  @ValidateNested()
  readonly booking!: Booking;

  @Type(() => InvitedGuest)
  @ValidateNested()
  @ApiPropertyOptional({ type: () => [InvitedGuest] })
  readonly invitedGuests?: InvitedGuest[];

  @Type(() => Order)
  @ApiPropertyOptional({ type: () => Order })
  @ValidateNested()
  readonly order?: Order;

  @Type(() => OrderLine)
  @ApiPropertyOptional({ type: () => [OrderLineCTO] })
  @ValidateNested()
  readonly orderLines?: OrderLineCTO[];
}
