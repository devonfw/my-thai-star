import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Dish } from '../../../dish/model/entities/dish.entity';
import { Ingredient } from '../../../dish/model/entities/ingredient.entity';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IOrderLine } from '../orderLine.interface';
import { Order } from './order.entity';

@Entity({ name: 'OrderLine' })
@Exclude()
export class OrderLine extends BaseEntity implements IOrderLine {
  @Column('bigint', { name: 'idDish', nullable: false })
  @Expose()
  @IsInt()
  @Transform(value => Number(value))
  dishId!: number;

  @Column('bigint', { nullable: true })
  @Expose()
  @IsInt()
  @IsOptional()
  amount?: number;

  @Column('varchar', { length: 255, nullable: true })
  @Expose()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  comment?: string;

  @Column('bigint', { name: 'idOrder', nullable: false })
  @Expose()
  @IsInt()
  @IsOptional()
  orderId?: number;

  @ManyToOne(() => Order, order => order.orderLines)
  @JoinColumn({
    name: 'idOrder',
  })
  @ApiHideProperty()
  order?: Order;

  @ManyToOne(() => Dish)
  @JoinColumn({ name: 'idDish' })
  @ApiHideProperty()
  dish?: Dish;

  @ManyToMany(() => Ingredient, {
    cascade: ['insert'],
  })
  @JoinTable({
    name: 'OrderDishExtraIngredient',
    joinColumn: { name: 'idOrderLine' },
    inverseJoinColumn: { name: 'idIngredient' },
  })
  @ApiHideProperty()
  ingredients?: Ingredient[];
}
