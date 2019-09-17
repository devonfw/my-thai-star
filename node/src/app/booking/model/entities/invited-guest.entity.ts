import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IInvitedGuest } from '../invited-guest.interface';
import { Booking } from './booking.entity';
import { Order } from '../../../order/model/entities/order.entity';
import { WithPrecisionColumnType } from 'typeorm/driver/types/ColumnTypes';

let DATE_COLUMN: WithPrecisionColumnType;
if (process.env.NODE_ENV === 'test') {
  DATE_COLUMN = 'datetime';
} else {
  DATE_COLUMN = 'timestamp';
}

@Entity({ name: 'InvitedGuest' })
export class InvitedGuest extends BaseEntity implements IInvitedGuest {
  @Column('bigint', { name: 'idBooking', nullable: false })
  @ApiModelProperty()
  @IsInt()
  @IsOptional()
  bookingId!: number;

  @Column('varchar', { length: 60, nullable: true })
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(60)
  @IsOptional()
  guestToken?: string;

  @Column('varchar', { length: 60, nullable: true })
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(60)
  @IsOptional()
  email?: string;

  @Column('boolean', { nullable: true })
  @ApiModelPropertyOptional()
  @Transform(value => Boolean(value))
  @IsBoolean()
  @IsOptional()
  accepted?: boolean;

  @Column(DATE_COLUMN, { nullable: true })
  @ApiModelPropertyOptional()
  @Transform(value => new Date(value))
  @IsDate()
  @IsOptional()
  modificationDate?: Date;

  @Column('bigint', { name: 'idOrder', nullable: true })
  @ApiModelPropertyOptional()
  @IsInt()
  @IsOptional()
  orderId?: number;

  @ManyToOne(_type => Booking, booking => booking.invitedGuests)
  @JoinColumn({ name: 'idBooking' })
  booking?: Booking;

  @ManyToOne(_type => Order, order => order.invitedGuestId, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idOrder' })
  order?: Booking;
}
