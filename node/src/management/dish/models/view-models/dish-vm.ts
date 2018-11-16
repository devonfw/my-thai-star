import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { BaseModelVM } from 'shared/base.model';

export class DishVm extends BaseModelVM {
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  description: string;
  @ApiModelProperty()
  price: number;
  @ApiModelPropertyOptional()
  image_id?: number;
  @ApiModelPropertyOptional()
  categories?: number[];
  @ApiModelPropertyOptional()
  extras?: number[];
}
