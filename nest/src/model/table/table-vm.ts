import { BaseModelVM } from 'shared/base.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class TableVm extends BaseModelVM {
  @ApiModelProperty()
  SeatsNumber: string;
}
