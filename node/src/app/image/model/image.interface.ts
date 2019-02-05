import { IBaseEntity } from '../../shared/model/base-entity.interface';

export interface IImage extends IBaseEntity {
  name?: string;
  content?: string;
  contentType?: number;
  mimeType?: string;
}
