import {
  Controller,
  Body,
  Put,
  HttpStatus,
  HttpException,
  Post,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Response, Filter, DishView } from 'shared/interfaces';
import { DishService } from './dish.service';
import { DishVm } from './models/view-models/dish-vm';
import { Dish } from './models/dish.entity';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';
import { DishResponseVm } from './models/view-models/dishResponseVm';

@Controller('/services/rest/dishmanagement/v1/dish')
@ApiUseTags('Dish')
export class DishController {
  constructor(private readonly _service: DishService) {}
  @Post('search')
  @ApiResponse({ status: HttpStatus.OK, type: DishResponseVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId('Dish', 'Search'))
  async getDishes(@Body() filter: Filter): Promise<Response<DishView>> {
    try {
      return await this._service.findDishes(filter);
    } catch (error) {
      throw error;
    }
  }

  @Put('update')
  @ApiResponse({ status: HttpStatus.OK, type: Dish })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId('dish', 'Create'))
  async updateDish(@Body() item: DishVm): Promise<Dish> {
    try {
      if (item.id !== undefined) return await this._service.updateDish(item);
      else
        throw new HttpException(
          'should provide the id of the dish to update',
          HttpStatus.BAD_REQUEST,
        );
    } catch (e) {
      throw e;
    }
  }
}
