import { DishService } from './dish.service';

describe('DishService', () => {
  let service: DishService;
  const find = jest.fn();
  const searchDishesByCriteria = jest.fn();

  beforeEach(async () => {
    service = new DishService({ find, searchDishesByCriteria } as any, { debug: jest.fn() } as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all dishes', async () => {
      await service.findAll(false);
      expect(find).toBeCalledTimes(1);
      expect(find).toHaveBeenLastCalledWith();
    });

    it('should return all dishes with the images', async () => {
      await service.findAll(true);
      expect(find).toBeCalledTimes(2);
      expect(find).toHaveBeenLastCalledWith({ relations: ['image'] });
    });
  });

  describe('searchDishes', () => {
    it('should search dishes and filter using the provided criteria', async () => {
      const criteria = {
        pageable: { pageNumber: 0, pageSize: 2 },
        categories: [{ id: 1 }, { id: 2 }],
        maxPrice: 20,
        minLikes: 2,
      };
      await service.searchDishes(criteria);
      expect(searchDishesByCriteria).toBeCalledTimes(1);
      expect(searchDishesByCriteria).toHaveBeenLastCalledWith(criteria);
    });
  });
});
