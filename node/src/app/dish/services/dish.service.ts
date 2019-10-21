import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { DishSearch } from '../model/dto/dish-search.dto';
import { Dish } from '../model/entities/dish.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class DishService extends TypeOrmCrudService<Dish> {
  constructor(
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
  ) {
    super(dishRepository);
  }

  findAll(withRelation: boolean): Promise<Dish[]> {
    if (withRelation) {
      return this.dishRepository.find({ relations: ['image'] });
    }
    return this.dishRepository.find();
  }

  async searchDishes(search: DishSearch): Promise<[Dish[], number]> {
    let queryBuilder = this.dishRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Dish.image', 'image')
      .leftJoinAndSelect('Dish.categories', 'category')
      .leftJoinAndSelect('Dish.ingredients', 'ingredient');

    if (search.maxPrice) {
      queryBuilder = queryBuilder.where('Dish.price <= :maxprice', {
        maxprice: search.maxPrice,
      });
    }

    if (search.searchBy) {
      queryBuilder = queryBuilder.andWhere(
        new Brackets(qb =>
          qb
            .where('LOWER(Dish.name) LIKE :query', {
              query: '%' + search.searchBy!.toLowerCase() + '%',
            })
            .orWhere('LOWER(Dish.description) LIKE :query', {
              query: '%' + search.searchBy!.toLowerCase() + '%',
            }),
        ),
      );
    }

    if (search.categories && search.categories.length !== 0) {
      // We search by category.id + 1 because in the frontend the ids starts in 0
      // (in order to work properly with the java backend) but here the ids starts
      // in 1
      const categoryId = search.categories.map(category => category.id + 1);
      queryBuilder = queryBuilder.andWhere('category.id IN (:...categories)', {
        categories: categoryId,
      });
    }

    if (search.pageable && search.pageable.sort) {
      search.pageable.sort.forEach(elem => {
        queryBuilder = queryBuilder.addOrderBy(
          'Dish_' + elem.property,
          elem.direction,
        );
      });
    }

    if (search.pageable) {
      queryBuilder = queryBuilder
        .take(search.pageable.pageSize)
        .skip(search.pageable.pageNumber * search.pageable.pageSize);
    }

    return await queryBuilder.getManyAndCount();
  }
}
