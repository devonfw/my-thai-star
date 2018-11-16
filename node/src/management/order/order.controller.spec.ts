import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

export class OrderServiceMock {}
describe('Order Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [{ provide: OrderService, useClass: OrderServiceMock }],
      controllers: [OrderController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: OrderController = module.get<OrderController>(
      OrderController,
    );
    expect(controller).toBeDefined();
  });
});
