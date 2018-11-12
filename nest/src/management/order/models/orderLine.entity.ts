import {
  Entity,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { BaseModel } from 'shared/base.model';
import { Order } from './order.entity';
import { Dish } from 'management/dish/models/dish.entity';
import { Ingredient } from 'model/ingredient/ingredient.entity';

@Entity()
export class OrderLine extends BaseModel<OrderLine> {
  @Column({ type: 'int' })
  amount: number;
  @Column({ type: 'nvarchar', length: 255, nullable: true })
  comment: string;

  @ManyToOne(type => Order, { eager: true })
  @JoinColumn({ name: 'IdOrder' })
  order: Order;

  @OneToOne(type => Dish, { eager: true })
  @JoinColumn({ name: 'IdDish' })
  dish: Dish;

  @ManyToMany(type => Ingredient, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'OrderDishExtraIngredient',
    joinColumn: { name: 'IdOrderLine', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'IdIngredient', referencedColumnName: 'id' },
  })
  extras: Array<Ingredient>;
}
