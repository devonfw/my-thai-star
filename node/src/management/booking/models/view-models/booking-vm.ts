import { BaseModelVM } from 'shared/base.model';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';

export class BookingVm extends BaseModelVM {
  @ApiModelPropertyOptional()
  assistants?: number;
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  name: string;
  @ApiModelPropertyOptional()
  comment?: string;
  @ApiModelProperty()
  bookingDate: string;
  @ApiModelProperty()
  bookingType: number;
}

export class CreateBookingVm {
  booking: BookingVm;
}

export class BookingDTO {
  @ApiModelPropertyOptional()
  id?: number;
  @ApiModelPropertyOptional()
  creationDate?: string;
  @ApiModelPropertyOptional()
  assistants?: number;
  @ApiModelPropertyOptional()
  bookingToken: string;
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  name: string;
  @ApiModelPropertyOptional()
  comment?: string;
  @ApiModelPropertyOptional()
  canceled: boolean;
  @ApiModelProperty()
  bookingDate: string;
  @ApiModelProperty()
  bookingType: string;
  @ApiModelProperty()
  expirationDate: string;
  @ApiModelPropertyOptional()
  userId?: number;
  @ApiModelPropertyOptional()
  orderId?: number;
  @ApiModelPropertyOptional()
  tableId?: number;
  @ApiModelPropertyOptional()
  revision?: number;
}

export class BookingResponseVm {
  @ApiModelPropertyOptional()
  pagination?: { size: number; page: number; total: number };
  @ApiModelPropertyOptional()
  result: BookingDTO;
}
