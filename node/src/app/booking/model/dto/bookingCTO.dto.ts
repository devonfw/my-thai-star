import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { User } from '../../../core/user/model/entities/user.entity';
import { OrderLine } from '../../../order/model/entities/order-line.entity';
import { Order } from '../../../order/model/entities/order.entity';
import { Booking } from '../entities/booking.entity';
import { InvitedGuest } from '../entities/invited-guest.entity';
import { Table } from '../entities/table.entity';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

/**
 * Class to keep the compatibility with the Java backend.
 *
 * @export
 * @class BookingCTO
 */
export class BookingCTO {
  @Type(() => Booking)
  @ValidateNested()
  @ApiProperty({ type: () => Booking })
  readonly booking!: Booking;

  @Type(() => Table)
  @ValidateNested()
  @ApiPropertyOptional({ type: () => Table })
  readonly table?: Table;

  @Type(() => InvitedGuest)
  @ValidateNested()
  @ApiPropertyOptional({ type: () => [InvitedGuest] })
  readonly invitedGuests?: InvitedGuest[];

  @Type(() => Order)
  @ValidateNested()
  @ApiPropertyOptional({ type: () => Order })
  readonly order?: Order;

  @Type(() => OrderLine)
  @ValidateNested()
  @ApiPropertyOptional({ type: () => [Order] })
  readonly orders?: Order[];

  @Type(() => User)
  @ValidateNested()
  @ApiPropertyOptional({ type: () => User })
  readonly user?: User;
}
