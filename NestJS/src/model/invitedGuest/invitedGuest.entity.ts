import { Entity, ManyToOne, Column, JoinColumn, OneToOne } from 'typeorm';
import { BaseModel } from 'shared/base.model';
import { Booking } from 'management/booking/models/booking.entity';
import { Order } from 'management/order/models/order.entity';

@Entity()
export class InvitedGuest extends BaseModel<InvitedGuest> {
  @ManyToOne(type => Booking, { nullable: false, eager: true })
  booking: Booking;
  @Column({ type: 'nvarchar', length: 60, nullable: true })
  guestToken: string;
  @Column({ type: 'nvarchar', length: 60, nullable: true })
  email: string;
  @Column({ type: 'boolean', default: 0 })
  accepted: boolean;
  @OneToOne(type => Order, order => order.invitedGuest)
  order: Order;
}
