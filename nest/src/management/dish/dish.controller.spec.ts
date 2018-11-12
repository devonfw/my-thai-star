import { Test, TestingModule } from '@nestjs/testing';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';

export class DishServiceMock {}
describe('Dish Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [DishController],
      providers: [{ provide: DishService, useClass: DishServiceMock }],
      // mocked service, if implementing tests should mock a service as in test/mocks examples.
    }).compile();
  });
  it('should be defined', () => {
    const controller: DishController = module.get<DishController>(
      DishController,
    );
    expect(controller).toBeDefined();
  });
});
