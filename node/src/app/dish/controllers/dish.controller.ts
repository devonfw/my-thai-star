import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DishPage } from '../model/dto/dish-page.dto';
import { DishSearch } from '../model/dto/dish-search.dto';
import { Dish } from '../model/entities/dish.entity';
import { DishService } from '../services/dish.service';

@Controller('services/rest/dishmanagement/v1/dish')
@ApiTags('Dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post('search')
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @HttpCode(200)
  async searchDishes(@Body() search: DishSearch): Promise<DishPage> {
    const [dishes, count]: [Dish[], number] = await this.dishService.searchDishes(search);

    return DishPage.fromDishes(count, search.pageable, dishes);
  }
}
