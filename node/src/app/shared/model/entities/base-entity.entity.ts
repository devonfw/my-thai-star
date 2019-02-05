import { PrimaryGeneratedColumn, Column, VersionColumn } from 'typeorm';
import { IBaseEntity } from '../base-entity.interface';
import { Expose } from 'class-transformer';

export abstract class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  @Expose()
  id!: number;

  @Column('integer', { nullable: false })
  @VersionColumn()
  modificationCounter!: number;
}
