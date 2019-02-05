import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { DishService } from './dish.service';
import { DishPage } from './model/dto/dish-page.dto';
import { DishSearch } from './model/dto/dish-search.dto';
import { Dish } from './model/entities/dish.entity';

@Controller('services/rest/dishmanagement/v1/dish')
@ApiUseTags('Dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post('search')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
  @HttpCode(200)
  async searchDishes(@Body() search: DishSearch): Promise<DishPage> {
    try {
      const [dishes, count]: [
        Dish[],
        number
      ] = await this.dishService.searchDishes(search);

      return DishPage.fromDishes(count, search.pageable, dishes);
    } catch (e) {
      throw new BadRequestException(e.message, e);
    }
  }
}
