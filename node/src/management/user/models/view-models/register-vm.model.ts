import { LoginVm } from './login-vm.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserRole } from '../user-role.enum';
import { EnumToArray } from '../../../../shared/utilities/to-array';

export class RegisterVm extends LoginVm {
  @ApiModelProperty()
  email: string;
  @ApiModelProperty({
    default: UserRole.Customer,
    example: UserRole.Customer,
    enum: EnumToArray(UserRole),
  })
  role: string;
}
