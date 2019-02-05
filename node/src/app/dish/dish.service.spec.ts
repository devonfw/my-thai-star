import { Test, TestingModule } from '@nestjs/testing';
import { DishService } from './dish.service';

describe('DishService', () => {
  let service: DishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DishService],
    }).compile();

    service = module.get<DishService>(DishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
