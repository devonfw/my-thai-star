import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsInt, IsOptional, MaxLength, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IOrderLine } from '../orderLine.interface';
import { Order } from './order.entity';
import { Dish } from '../../../dish/model/entities/dish.entity';
import { Ingredient } from '../../../dish/model/entities/ingredient.entity';

@Entity({ name: 'OrderLine' })
@Exclude()
export class OrderLine extends BaseEntity implements IOrderLine {
  @Column('bigint', { name: 'idDish', nullable: false })
  @ApiModelProperty()
  @Expose()
  @IsInt()
  @Transform(value => Number(value))
  dishId!: number;

  @Column('bigint', { nullable: true })
  @ApiModelPropertyOptional()
  @Expose()
  @IsInt()
  @IsOptional()
  amount?: number;

  @Column('varchar', { length: 255, nullable: true })
  @ApiModelPropertyOptional()
  @Expose()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  comment?: string;

  @Column('bigint', { name: 'idOrder', nullable: false })
  @ApiModelProperty()
  @Expose()
  @IsInt()
  @IsOptional()
  orderId?: number;

  @ManyToOne(_type => Order, order => order.orderLines)
  @JoinColumn({
    name: 'idOrder',
  })
  order?: Order;

  @ManyToOne(_type => Dish)
  @JoinColumn({ name: 'idDish' })
  dish?: Dish;

  @ManyToMany(_type => Ingredient, {
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'OrderDishExtraIngredient',
    joinColumn: { name: 'idOrderLine' },
    inverseJoinColumn: { name: 'idIngredient' },
  })
  ingredients?: Ingredient[];
}
