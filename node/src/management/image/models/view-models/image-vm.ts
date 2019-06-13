import { BaseModelVM } from 'shared/base.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class ImageVm extends BaseModelVM {
  @ApiModelProperty()
  content: string;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  mimeType: string;
  @ApiModelProperty()
  contentType: number;
}
