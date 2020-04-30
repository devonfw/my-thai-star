import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { TransformationType } from 'class-transformer/TransformOperationExecutor';
import { IsBoolean, IsDate, IsEmail, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import * as md5 from 'md5';
import * as moment from 'moment';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../../core/user/model/entities/user.entity';
import { Order } from '../../../order/model/entities/order.entity';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IsFuture } from '../../../shared/validators/is-future';
import { BookingTypes } from '../booking-types';
import { IBooking } from '../booking.interface';
import { InvitedGuest } from './invited-guest.entity';
import { Table } from './table.entity';

@Entity({ name: 'Booking' })
@Exclude()
export class Booking extends BaseEntity implements IBooking {
  @Column('bigint', { name: 'idUser', nullable: true })
  @IsInt()
  @IsOptional()
  @Expose()
  userId?: number;

  @Column('varchar', { length: 255, nullable: false })
  @IsString()
  @MaxLength(255)
  @Expose()
  name!: string;

  @Column('varchar', { length: 60, nullable: true })
  @IsString()
  @MaxLength(60)
  @IsOptional()
  @Expose()
  bookingToken?: string;

  @Column('varchar', { length: 4000, nullable: true })
  @IsString()
  @MaxLength(4000)
  @IsOptional()
  @Expose()
  comment?: string;

  @Column('varchar', { length: 255, nullable: false })
  @IsString()
  @MaxLength(255)
  @IsEmail()
  @Expose()
  email!: string;

  @Column('datetime', { nullable: false })
  @IsDate()
  @IsFuture(1)
  @Expose()
  @Transform(
    (value: Date, _obj: any, transformationType: TransformationType) => {
      if (transformationType === TransformationType.CLASS_TO_CLASS) {
        return value;
      }

      if (transformationType === TransformationType.PLAIN_TO_CLASS) {
        return new Date(value);
      }

      return moment(value).unix();
    },
    // {
    //   toPlainOnly: true,
    // },
  )
  bookingDate!: Date;

  @Column('datetime', { nullable: true })
  @IsDate()
  @IsOptional()
  @Expose()
  @Transform((value: Date) => moment(value).unix(), { toPlainOnly: true })
  expirationDate?: Date;

  @Column('datetime', { nullable: false })
  @IsDate()
  @IsOptional()
  @Expose()
  @Transform((value: Date) => moment(value).unix(), { toPlainOnly: true })
  creationDate?: Date;

  @Column('boolean', { nullable: false })
  @IsBoolean()
  @IsOptional()
  @Expose()
  canceled?: boolean = false;

  @Column('integer', { nullable: true })
  @IsInt()
  @IsOptional()
  @Expose()
  bookingType?: number;

  @Column('bigint', { name: 'idTable', nullable: true })
  @IsInt()
  @IsOptional()
  @Expose()
  tableId?: number;

  @Column('bigint', { name: 'idOrder', nullable: true })
  @IsInt()
  @IsOptional()
  @Expose()
  orderId?: number;

  @Column('integer', { nullable: true })
  @IsInt()
  @IsOptional()
  @Expose()
  assistants?: number;

  @OneToMany(() => InvitedGuest, invited => invited.booking, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ApiHideProperty()
  invitedGuests?: InvitedGuest[];

  @ManyToOne(() => Table)
  @JoinColumn({ name: 'idTable' })
  @ApiHideProperty()
  table?: Table;

  @ManyToOne(() => Order, order => order.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idOrder' })
  @ApiHideProperty()
  order?: Order;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'idUser' })
  // @ApiPropertyOptional({ type: () => User })
  @ApiHideProperty()
  user?: User;

  static create(booking: Partial<Booking>): Booking {
    const newBooking = plainToClass(Booking, booking);
    const bookingDate = moment(booking.bookingDate);
    const now = moment();

    newBooking.bookingType = newBooking.bookingType ?? BookingTypes.COMMON;

    const calculatedValues: Partial<Booking> = {
      bookingToken: 'CB_' + now.format('YYYYMMDD') + '_' + md5(newBooking.email + now.format('YYYYMMDDHHmmss')),
      expirationDate: bookingDate.subtract(1, 'hour').toDate(),
      canceled: false,
      creationDate: now.toDate(),
    };

    Object.assign(newBooking, calculatedValues);

    return newBooking;
  }
}
