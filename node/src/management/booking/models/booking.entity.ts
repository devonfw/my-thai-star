import { BaseModel } from 'shared/base.model';
import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'management/user/models/user.entity';
import { Table } from 'model/table/table.entity';
import { InvitedGuest } from 'model/invitedGuest/invitedGuest.entity';
import { Order } from 'management/order/models/order.entity';

@Entity()
export class Booking extends BaseModel<Booking> {
  @ManyToOne(type => User, user => user.bookings, {
    eager: true,
    nullable: true,
  })
  user: User;
  @Column({ type: 'nvarchar', length: 120 })
  name: string;
  @Column({ type: 'nvarchar', length: 60, nullable: true })
  bookingToken: string;
  @Column({ type: 'nvarchar', length: 4000, nullable: true })
  comment: string;
  @Column({ type: 'nvarchar', length: 255 })
  email: string;
  @Column({ type: 'datetime' })
  bookingDate: Date;
  @Column({ type: 'datetime' })
  expirationDate: Date;
  @Column({ type: 'boolean', default: 0 })
  canceled: boolean;
  @Column({ type: 'int' })
  bookingType: number;
  @Column({ type: 'int', nullable: true })
  assistants?: number;
  @OneToOne(type => Order, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'idOrder',
    referencedColumnName: 'id',
  })
  order?: Order;

  @ManyToOne(type => Table, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'tableId', referencedColumnName: 'id' })
  table?: Table;
  @OneToMany(type => InvitedGuest, invitedGuest => invitedGuest.booking, {
    nullable: true,
  })
  invitedGuests?: Array<InvitedGuest>;
  @OneToMany(type => Order, order => order.booking, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orders?: Array<Order>;
}
