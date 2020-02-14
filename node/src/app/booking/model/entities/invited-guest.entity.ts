import { ApiHideProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import * as md5 from 'md5';
import * as moment from 'moment';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from '../../../order/model/entities/order.entity';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IInvitedGuest } from '../invited-guest.interface';
import { Booking } from './booking.entity';

@Entity({ name: 'InvitedGuest' })
export class InvitedGuest extends BaseEntity implements IInvitedGuest {
  @Column('bigint', { name: 'idBooking', nullable: false })
  @IsInt()
  @IsOptional()
  bookingId!: number;

  @Column('varchar', { length: 60, nullable: true })
  @IsString()
  @MaxLength(60)
  @IsOptional()
  guestToken?: string;

  @Column('varchar', { length: 60, nullable: true })
  @IsString()
  @MaxLength(60)
  @IsOptional()
  email?: string;

  @Column('boolean', { nullable: true })
  @Transform(value => Boolean(value))
  @IsBoolean()
  @IsOptional()
  accepted?: boolean;

  @Column('datetime', { nullable: true })
  @Transform(value => new Date(value))
  @IsDate()
  @IsOptional()
  modificationDate?: Date;

  @Column('bigint', { name: 'idOrder', nullable: true })
  @IsInt()
  @IsOptional()
  orderId?: number;

  @ManyToOne(() => Booking, booking => booking.invitedGuests)
  @JoinColumn({ name: 'idBooking' })
  @ApiHideProperty()
  booking?: Booking;

  @ManyToOne(() => Order, order => order.invitedGuestId, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idOrder' })
  @ApiHideProperty()
  order?: Order;

  static create(invitedGuest: Partial<InvitedGuest>): InvitedGuest {
    const now = moment();
    return plainToClass(InvitedGuest, {
      bookingId: invitedGuest.bookingId,
      guestToken: 'GB_' + now.format('YYYYMMDD') + '_' + md5(invitedGuest.email + now.format('YYYYMMDDHHmmss')),
      modificationDate: now.toDate(),
      email: invitedGuest.email,
    });
  }
}
