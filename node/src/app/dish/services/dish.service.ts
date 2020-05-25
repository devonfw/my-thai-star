import { Injectable } from '@nestjs/common';
import { DishSearch } from '../model/dto/dish-search.dto';
import { Dish } from '../model/entities/dish.entity';
import { DishRepository } from '../repositories/dish.repository';
import { WinstonLogger } from '../../shared/logger/winston.logger';
@Injectable()
export class DishService {
  constructor(private readonly dishRepository: DishRepository, private readonly logger: WinstonLogger) {}

  /**
   * Return all dishes. If withRelation is true it will return the
   * images inside the dishes.
   *
   * @param withRelation return the dishes with relations
   */
  findAll(withRelation: boolean): Promise<Dish[]> {
    this.logger.debug(`Executing findAll. Params: withRelation=${withRelation}`, 'DishService');

    if (withRelation) {
      return this.dishRepository.find({ relations: ['image'] });
    }
    return this.dishRepository.find();
  }

  /**
   * Search dishes by criteria.
   * @param search the search criteria
   */
  async searchDishes(search: DishSearch): Promise<[Dish[], number]> {
    this.logger.debug(`Executing searchDishes. Params: search=${search}`, 'DishService');
    return this.dishRepository.searchDishesByCriteria(search);
  }
}
