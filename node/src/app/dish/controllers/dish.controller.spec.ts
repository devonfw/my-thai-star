import { Test, TestingModule } from '@nestjs/testing';
import { DishController } from './dish.controller';

describe('Dish Controller', () => {
  let controller: DishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DishController],
    }).compile();

    controller = module.get<DishController>(DishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
