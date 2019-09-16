import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ValidateNested, IsOptional } from 'class-validator';
import { Booking } from '../entities/booking.entity';
import { Type } from 'class-transformer';
import { InvitedGuest } from '../entities/invited-guest.entity';

export class NewBooking {
  @ApiModelProperty()
  @ValidateNested()
  @Type(() => Booking)
  readonly booking!: Booking;

  @ApiModelPropertyOptional()
  @ValidateNested()
  @Type(() => InvitedGuest)
  @IsOptional()
  readonly invitedGuests?: InvitedGuest[];
}
