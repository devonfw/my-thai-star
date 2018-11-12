import { BaseModel } from 'shared/base.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class Category extends BaseModel<Category> {
  @Column({ type: 'nvarchar', length: 120 })
  name: string;

  @Column({ type: 'nvarchar', length: 255 })
  description: string;

  @Column({ type: 'int' })
  showOrder: number;
}
