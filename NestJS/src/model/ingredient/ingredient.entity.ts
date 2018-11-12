import { BaseModel } from 'shared/base.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class Ingredient extends BaseModel<Ingredient> {
  @Column({ type: 'nvarchar', length: 120 })
  name: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'decimal', precision: 26 })
  price: number;
}
