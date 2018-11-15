import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './models/order.entity';
import { OrderLine } from './models/orderLine.entity';
import { Ingredient } from '../../model/ingredient/ingredient.entity';
import { Dish } from '../dish/models/dish.entity';
import { BookingService } from '../booking/booking.service';

export class BookingServiceMock {}
describe('OrderService', () => {
  let service: OrderService;
  beforeAll(async () => {
    const orderRepository = new Repository<Order>();
    const IngredientRepository = new Repository<Ingredient>();
    const DishRepository = new Repository<Dish>();
    const OrderLineRepository = new Repository<OrderLine>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: orderRepository,
        },
        {
          provide: getRepositoryToken(Ingredient),
          useValue: IngredientRepository,
        },
        {
          provide: getRepositoryToken(Dish),
          useValue: DishRepository,
        },
        {
          provide: getRepositoryToken(OrderLine),
          useValue: OrderLineRepository,
        },
        {
          provide: BookingService,
          useClass: BookingServiceMock,
        },
      ],
    }).compile();
    service = module.get<OrderService>(OrderService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
