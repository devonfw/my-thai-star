import { BaseModelVM } from 'shared/base.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class InvitedGuestVm extends BaseModelVM {
  @ApiModelProperty()
  bookingId: string;
  @ApiModelProperty()
  guestToken: string;
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  accepted: boolean;
}
