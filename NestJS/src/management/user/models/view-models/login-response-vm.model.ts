import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class LoginResponseVm {
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  role: string;
  @ApiModelPropertyOptional()
  token?: string;
}
