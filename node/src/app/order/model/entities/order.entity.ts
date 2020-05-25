import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Booking } from '../../../booking/model/entities/booking.entity';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IOrder } from '../order.interface';
import { OrderLine } from './order-line.entity';

@Entity({ name: 'Orders' })
@Exclude()
export class Order extends BaseEntity implements IOrder {
  @Column('bigint', { name: 'idBooking', nullable: false })
  @Expose()
  @IsInt()
  bookingId!: number;

  @Column('bigint', { name: 'idInvitedGuest', nullable: true })
  @Expose()
  @IsInt()
  @IsOptional()
  invitedGuestId?: number;

  @Column('bigint', { name: 'idHost', nullable: true })
  @Expose()
  @IsInt()
  @IsOptional()
  hostId?: number;

  @OneToOne(() => Booking)
  @JoinColumn({ name: 'idBooking' })
  @ApiHideProperty()
  booking?: Booking;

  @OneToMany(() => OrderLine, orderLine => orderLine.order, {
    onUpdate: 'CASCADE',
  })
  @ApiHideProperty()
  orderLines?: OrderLine[];
}
