import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Transform, Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IsFuture } from '../../../shared/validators';
import { IBooking } from '../booking.interface';
import { InvitedGuest } from './invited-guest.entity';
import { Table } from './table.entity';
import { Order } from '../../../order/model/entities/order.entity';
import { WithPrecisionColumnType } from 'typeorm/driver/types/ColumnTypes';
import { User } from '../../../user/model/entity/user.entity';
import * as moment from 'moment';

let DATE_COLUMN: WithPrecisionColumnType;
if (process.env.NODE_ENV === 'production') {
  DATE_COLUMN = 'timestamp';
} else {
  DATE_COLUMN = 'datetime';
}

@Entity({ name: 'Booking' })
@Exclude()
export class Booking extends BaseEntity implements IBooking {
  @Column('bigint', { name: 'idUser', nullable: true })
  @ApiModelPropertyOptional()
  @IsInt()
  @IsOptional()
  @Expose()
  userId?: number;

  @Column('varchar', { length: 255, nullable: false })
  @ApiModelProperty()
  @IsString()
  @MaxLength(255)
  @Expose()
  name!: string;

  @Column('varchar', { length: 60, nullable: true })
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(60)
  @IsOptional()
  @Expose()
  bookingToken?: string;

  @Column('varchar', { length: 4000, nullable: true })
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(4000)
  @IsOptional()
  @Expose()
  comment?: string;

  @Column('varchar', { length: 255, nullable: false })
  @ApiModelProperty()
  @IsString()
  @MaxLength(255)
  @IsEmail()
  @Expose()
  email!: string;

  @Column(DATE_COLUMN, { nullable: false })
  @ApiModelProperty()
  @IsDate()
  @IsFuture(1)
  @Expose()
  @Transform((value: Date) => moment(value).unix(), { toPlainOnly: true })
  bookingDate!: Date;

  @Column(DATE_COLUMN, { nullable: true })
  @ApiModelPropertyOptional()
  @IsDate()
  @IsOptional()
  @Expose()
  @Transform((value: Date) => moment(value).unix(), { toPlainOnly: true })
  expirationDate?: Date;

  @Column(DATE_COLUMN, { nullable: false })
  @ApiModelPropertyOptional()
  @IsDate()
  @IsOptional()
  @Expose()
  @Transform((value: Date) => moment(value).unix(), { toPlainOnly: true })
  creationDate?: Date;

  @Column('boolean', { nullable: false })
  @ApiModelProperty()
  @IsBoolean()
  @IsOptional()
  @Expose()
  canceled?: boolean = false;

  @Column('integer', { nullable: true })
  @ApiModelPropertyOptional()
  @IsInt()
  @IsOptional()
  @Expose()
  bookingType?: number;

  @Column('bigint', { name: 'idTable', nullable: true })
  @ApiModelPropertyOptional()
  @IsInt()
  @IsOptional()
  @Expose()
  tableId?: number;

  @Column('bigint', { name: 'idOrder', nullable: true })
  @ApiModelPropertyOptional()
  @IsInt()
  @IsOptional()
  @Expose()
  orderId?: number;

  @Column('integer', { nullable: true })
  @ApiModelPropertyOptional()
  @IsInt()
  @IsOptional()
  @Expose()
  assistants?: number;

  @OneToMany(_type => InvitedGuest, invited => invited.booking, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  invitedGuests?: InvitedGuest[];

  @ManyToOne(_type => Table)
  @JoinColumn({ name: 'idTable' })
  table?: Table;

  @ManyToOne(_type => Order, order => order.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idOrder' })
  order?: Order;

  @ManyToOne(_type => User, user => user.id)
  @JoinColumn({ name: 'idUser' })
  user?: User;
}
