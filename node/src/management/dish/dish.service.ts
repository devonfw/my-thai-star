import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'shared/base.service';
import { Dish } from './models/dish.entity';
import { Repository, getRepository, SelectQueryBuilder } from 'typeorm';
import { DishVm } from './models/view-models/dish-vm';
import { Response, Filter, Pageable, DishView, Sort } from 'shared/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'model/category/category.entity';
import { Ingredient } from 'model/ingredient/ingredient.entity';
import { Image } from 'management/image/models/image.entity';
import { FilterCategoriesToArray } from 'shared/utilities/to-array';

@Injectable()
export class DishService extends BaseService<Dish> {
  private readonly _categoryService: Repository<Category>;
  private readonly _ingredientService: Repository<Ingredient>;
  private readonly _imageService: Repository<Image>;
  constructor(
    @InjectRepository(Dish) private readonly _dishRepository: Repository<Dish>,
  ) {
    super();
    this._repository = _dishRepository;
    this._categoryService = getRepository(Category);
    this._ingredientService = getRepository(Ingredient);
    this._imageService = getRepository(Image);
  }

  async findDishes(filter: Filter): Promise<Response<DishView>> {
    try {
      const pag: Pageable = filter.pageable || undefined;
      const response: Response<DishView> = { pageable: pag, content: [] };
      let query = this._repository.createQueryBuilder('dish');
      query = await this.buildQuery(query, filter);
      const dishes = await query.getMany();
      for (const plate of dishes) {
        const { image, categories, extras, ...dishview } = plate;
        const resultElement: DishView = {
          dish: dishview,
          image: { content: plate.image.content },
          extras: plate.extras,
          categories: plate.categories,
        };
        response.content.push(resultElement);
      }
      return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateDish(item: DishVm): Promise<Dish> {
    try {
      const dish = await this.findById(item.id);
      if (dish) {
        if (item.categories && item.categories.length !== 0) {
          const categories = await this._categoryService.findByIds(
            item.categories,
          );
          if (categories && categories.length !== 0)
            dish.categories = categories;
        }
        if (item.extras && item.extras.length !== 0) {
          const extras = await this._ingredientService.findByIds(item.extras);
          if (extras && extras.length !== 0) dish.extras = extras;
        }
        if (item.image_id) {
          const image = await this._imageService.findOne({ id: item.image_id });
          if (image) dish.image = image;
        }
        return await this._repository.save(dish);
      } else {
        throw new HttpException(
          'This dish does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async buildQuery(
    query: SelectQueryBuilder<Dish>,
    filter: Filter,
  ): Promise<SelectQueryBuilder<Dish>> {
    try {
      if (filter.categories.length !== 0) {
        query.leftJoinAndSelect('dish.categories', 'category').where(
          `dish.id in (Select idDish from DishCategory where idCategory in (${FilterCategoriesToArray(
            filter.categories,
          )
            .toString()
            .replace('[', '')
            .replace(']', '')}))`,
        );
      } else {
        query
          .leftJoinAndSelect('dish.categories', 'category')
          .where(
            'dish.id in (Select idDish from DishCategory where idCategory not in ())',
          );
      }
      query.leftJoinAndSelect('dish.image', 'image');
      query.leftJoinAndSelect('dish.extras', 'DishIngredient');
      if (filter.maxPrice)
        query.andWhere('dish.price < :maxprice', { maxprice: filter.maxPrice });
      if (filter.searchBy)
        query.andWhere('dish.name like :input', {
          input: `%${filter.searchBy}%`,
        });
      if (filter.pageable) {
        if (filter.pageable.sort) {
          query = await this.addOrderBy(query, filter.pageable.sort);
        }
        query
          .skip((filter.pageable.pageNumber - 1) * filter.pageable.pageSize)
          .take(filter.pageable.pageSize);
      }
      return query;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  addOrderBy(
    query: SelectQueryBuilder<Dish>,
    sort: Sort[],
  ): SelectQueryBuilder<Dish> {
    let newQuery = query;
    sort.forEach((value, index, array) => {
      switch (value.property) {
        case 'name':
          if (value.direction === 'ASC') {
            newQuery = query.orderBy('dish.name', 'ASC');
          } else {
            newQuery = query.orderBy('dish.name', 'DESC');
          }
          break;
        case 'price':
          if (value.direction === 'ASC') {
            newQuery = query.orderBy('dish.price', 'ASC');
          } else {
            newQuery = query.orderBy('dish.price', 'DESC');
          }
          break;
        default:
          break;
      }
    });
    return newQuery;
  }
}
