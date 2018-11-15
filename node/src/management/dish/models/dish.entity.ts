import { BaseModel } from 'shared/base.model';
import { Image } from '../../image/models/image.entity';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Ingredient } from 'model/ingredient/ingredient.entity';
import { Category } from 'model/category/category.entity';

@Entity()
export class Dish extends BaseModel<Dish> {
  @Column({ type: 'nvarchar', length: 120 })
  name: string;
  @Column({ type: 'nvarchar', length: 4000 })
  description: string;
  @Column({ type: 'decimal', precision: 26 })
  price: number;

  @OneToOne(type => Image, { eager: true })
  @JoinColumn({ name: 'idImage' })
  image?: Image;

  @ManyToMany(type => Ingredient, { eager: true })
  @JoinTable({
    name: 'DishIngredient',
    joinColumn: { name: 'idDish' },
    inverseJoinColumn: { name: 'idIngredient' },
  })
  extras?: Array<Ingredient>;

  @ManyToMany(type => Category, { eager: true })
  @JoinTable({
    name: 'DishCategory',
    joinColumn: { name: 'idDish' },
    inverseJoinColumn: { name: 'idCategory' },
  })
  categories?: Array<Category>;
}
