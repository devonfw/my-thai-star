import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { Booking } from '../entities/booking.entity';
import { InvitedGuest } from '../entities/invited-guest.entity';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class NewBooking {
  @ValidateNested()
  @Type(() => Booking)
  @ApiProperty({ type: () => Booking })
  readonly booking!: Booking;

  @ValidateNested()
  @Type(() => InvitedGuest)
  @IsOptional()
  @ApiPropertyOptional({ type: () => [InvitedGuest] })
  readonly invitedGuests?: InvitedGuest[];
}
