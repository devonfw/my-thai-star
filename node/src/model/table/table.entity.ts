import { BaseModel } from 'shared/base.model';
import { Entity, Column } from 'typeorm';

@Entity()
export class Table extends BaseModel<Table> {
  @Column({ type: 'bigint', nullable: false })
  seatsNumber: number;
}
