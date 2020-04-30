import { IPageable } from './pageable.interface';

export interface IPage<T> {
  content: T[];
  pageable: IPageable;
  totalElements: number;
}
