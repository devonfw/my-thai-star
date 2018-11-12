import { UserRole } from './user-role.enum';
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseModel } from '../../../shared/base.model';
import { Dish } from 'management/dish/models/dish.entity';
import { Booking } from 'management/booking/models/booking.entity';

@Entity({ name: 'UserProfile' })
export class User extends BaseModel<User> {
  @Column({ type: 'text', unique: true, nullable: false })
  username: string;
  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: false, default: UserRole.Customer })
  role: string;

  @ManyToMany(type => Dish, { eager: true })
  @JoinTable({
    name: 'UserFavourite',
    joinColumn: { name: 'idUser' },
    inverseJoinColumn: { name: 'idDish' },
  })
  favourites: Array<Dish>;

  @OneToMany(type => Booking, booking => booking.user)
  bookings: Array<Booking>;
}
