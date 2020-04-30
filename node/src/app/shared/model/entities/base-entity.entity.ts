import { Exclude, Expose } from 'class-transformer';
import { PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Expose()
  id!: number;

  @VersionColumn({ default: 1 })
  @Exclude({ toPlainOnly: true })
  modificationCounter!: number;
}
