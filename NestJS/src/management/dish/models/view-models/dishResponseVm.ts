import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class DishResponseVm {
  @ApiModelPropertyOptional()
  pagination?: { size: number; page: number; total: number };
  @ApiModelPropertyOptional()
  result: [{ categories: any; dish: any; extras: any; image: any }];
}
