process.env.NODE_ENV = 'test';
import { Test, TestingModule } from '@nestjs/testing';
import { DishController } from './dish.controller';
import { CoreModule } from '../../core/core.module';
import { DishPage } from '../model/dto/dish-page.dto';
import { DishModule } from '../dish.module';
import { dishesSample } from '../../../migration/__fixture__/dish/dishes.fixture';

describe('DishController', () => {
  let controller: DishController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, DishModule],
    }).compile();
    controller = module.get<DishController>(DishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchDishes', () => {
    it('should paginate the response', async () => {
      const search: DishPage = await controller.searchDishes({ pageable: { pageNumber: 0, pageSize: 2 } });
      expect(search.pageable).toStrictEqual({ pageNumber: 0, pageSize: 2 });
      expect(search.content.length).toStrictEqual(2);
      expect(search.totalElements).toStrictEqual(dishesSample.length);
    });

    it('should order the response', async () => {
      const search: DishPage = await controller.searchDishes({
        pageable: { pageNumber: 0, pageSize: 10, sort: [{ property: 'name', direction: 'ASC' }] },
      });

      expect(search.content.length).toStrictEqual(dishesSample.length);
      expect(
        search.content.reduce((prev, curr, idx) => {
          if (idx === 0) return prev;

          return prev && curr <= search.content[idx - 1];
        }, true),
      ).toStrictEqual(true);
    });

    it('should filter by category', async () => {
      const search: DishPage = await controller.searchDishes({
        categories: [{ id: 0 }],
        pageable: { pageNumber: 0, pageSize: 10 },
      });

      expect(search.content.length).toStrictEqual(3);
      search.content.forEach(elem => {
        expect(elem.categories?.find(elem => elem.id === 1)).toBeDefined();
      });
    });

    it('should filter by search string', async () => {
      const search: DishPage = await controller.searchDishes({
        searchBy: 'spicy',
        pageable: { pageNumber: 0, pageSize: 10 },
      });

      expect(search.content.length).toStrictEqual(2);
      search.content.forEach(elem => {
        expect(
          elem.dish.name?.toLocaleLowerCase().includes('spicy') ||
            elem.dish.description?.toLocaleLowerCase().includes('spicy'),
        ).toStrictEqual(true);
      });
    });

    it('should filter by price', async () => {
      const search: DishPage = await controller.searchDishes({
        maxPrice: 10,
        pageable: { pageNumber: 0, pageSize: 10 },
      });

      expect(search.content.length).toStrictEqual(4);
      search.content.forEach(elem => {
        expect(elem.dish.price).toBeLessThanOrEqual(10);
      });
    });
  });
});
