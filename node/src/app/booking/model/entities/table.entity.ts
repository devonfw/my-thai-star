import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsInt } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { ITable } from '../table.interface';
import { Booking } from './booking.entity';

@Entity({ name: 'Tables' })
export class Table extends BaseEntity implements ITable {
  @Column('integer', { nullable: false })
  @IsInt()
  seatsNumber!: number;

  @OneToMany(
    () => Booking,
    booking => booking.table,
  )
  @ApiHideProperty()
  @Exclude()
  bookings?: Booking[];
}
