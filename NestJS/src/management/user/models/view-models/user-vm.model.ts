import { BaseModelVM } from '../../../../shared/base.model';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { EnumToArray } from '../../../../shared/utilities/to-array';
import { UserRole } from '../user-role.enum';

export class UserVm extends BaseModelVM {
  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  email: string;

  @ApiModelPropertyOptional({
    enum: EnumToArray(UserRole),
    default: UserRole.Customer,
    example: UserRole.Customer,
  })
  role?: string;
}
