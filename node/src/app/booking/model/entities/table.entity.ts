import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { ITable } from '../table.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Booking } from './booking.entity';

@Entity({ name: 'Tables' })
export class Table extends BaseEntity implements ITable {
  @Column('integer', { nullable: false })
  @ApiModelProperty()
  @IsInt()
  seatsNumber!: number;

  @OneToMany(_type => Booking, booking => booking.table)
  bookings?: Booking[];
}
