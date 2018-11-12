import { ApiModelProperty } from '@nestjs/swagger';

export class ChangePasswordVm {
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  oldPassword: string;
  @ApiModelProperty()
  newPassword: string;
}
