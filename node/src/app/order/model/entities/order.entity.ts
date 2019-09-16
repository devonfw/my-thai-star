import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IOrder } from '../order.interface';
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { OrderLine } from './order-line.entity';
import { Booking } from '../../../booking/model/entities/booking.entity';

@Entity({ name: 'Orders' })
@Exclude()
export class Order extends BaseEntity implements IOrder {
  @Column('bigint', { name: 'idBooking', nullable: false })
  @ApiModelProperty()
  @Expose()
  @IsInt()
  bookingId!: number;

  @Column('bigint', { name: 'idInvitedGuest', nullable: true })
  @Expose()
  @ApiModelPropertyOptional()
  @Expose()
  @IsInt()
  @IsOptional()
  invitedGuestId?: number;

  @Column('bigint', { name: 'idHost', nullable: true })
  @Expose()
  @ApiModelPropertyOptional()
  @Expose()
  @IsInt()
  @IsOptional()
  hostId?: number;

  @OneToOne(_type => Booking)
  @JoinColumn({ name: 'idBooking' })
  booking?: Booking;

  @OneToMany(_type => OrderLine, orderLine => orderLine.order, {
    onUpdate: 'CASCADE',
  })
  orderLines?: OrderLine[];
}
