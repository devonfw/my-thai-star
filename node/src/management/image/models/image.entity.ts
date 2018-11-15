import { Entity, Column } from 'typeorm';
import { BaseModel } from 'shared/base.model';

@Entity()
export class Image extends BaseModel<Image> {
  @Column({ type: 'nvarchar' })
  content: string;
  @Column({ type: 'nvarchar' })
  name: string;
  @Column({ type: 'nvarchar', length: 10 })
  mimeType: string;
  @Column({ type: 'int' })
  contentType: number;
}
