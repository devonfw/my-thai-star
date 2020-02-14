// import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderUseCase } from './create-order.use-case';
import { InvalidTokenException } from '../../../shared/exceptions/invalid-token.exception';
import { OrderAlreadyDoneException } from '../../exceptions/order-already-done.exception';
import { GuestNotAccpetedException } from '../../exceptions/guest-not-accepted.exception';
import { OrderLineCTO } from '../../model/dto/order-lineCTO.dto';
import { Order } from '../../model/entities/order.entity';
import { plainToClass } from 'class-transformer';
import { OrderLine } from '../../model/entities/order-line.entity';

const fakeOrder: Order = plainToClass(Order, {
  id: 1,
  bookingId: 1,
  orderLines: [
    {
      id: 1,
      modificationCounter: 1,
      dishId: 1,
      amount: 2,
      comment: 'please not too spicy',
      orderId: 1,
    },
    { id: 2, modificationCounter: 1, dishId: 5, amount: 1, orderId: 1 },
  ],
});

describe('CreateOrderUseCase', () => {
  let uc: CreateOrderUseCase;

  beforeAll(async () => {
    uc = new CreateOrderUseCase(
      {
        getBookingByToken: jest
          .fn()
          .mockReturnValueOnce(undefined)
          .mockReturnValueOnce({ orderId: 1 })
          .mockReturnValue({ id: 1 }),
        getInvitedGuestByToken: jest
          .fn()
          .mockReturnValueOnce(undefined)
          .mockReturnValueOnce({ orderId: 1 })
          .mockReturnValueOnce({ orderId: 1, accepted: true })
          .mockReturnValue({ id: 1, accepted: true }),
      } as any,
      { findOne: jest.fn().mockReturnValue(fakeOrder), save: (order: Order): Order => ({ ...order, id: 1 }) } as any,
      { save: (orderLine: OrderLine) => ({ ...orderLine, id: 1 }) } as any,
    );
  });

  it('should be defined', () => {
    expect(uc).toBeDefined();
  });

  describe('createOrder', () => {
    it('should throw an error if an invalid token is passed (it means, it does not starts with CB_ or GB_)', () => {
      return expect(uc.createOrder([], '123')).rejects.toThrowError(InvalidTokenException);
    });
    it('should throw an error if the common booking does not exists', () => {
      return expect(uc.createOrder([], 'CB_123')).rejects.toThrowError(InvalidTokenException);
    });
    it('should throw an error if guest booking does not exists', () => {
      return expect(uc.createOrder([], 'GB_123')).rejects.toThrowError(InvalidTokenException);
    });
    it('should throw an error if the booker already did an order', () => {
      return expect(uc.createOrder([], 'CB_123')).rejects.toThrowError(OrderAlreadyDoneException);
    });
    it('should throw an error if the guest did not accept the invitation', () => {
      return expect(uc.createOrder([], 'GB_123')).rejects.toThrowError(GuestNotAccpetedException);
    });
    it('should throw an error if the guest already did an order', () => {
      return expect(uc.createOrder([], 'GB_123')).rejects.toThrowError(OrderAlreadyDoneException);
    });
    it('should create a booking order', () => {
      const orderLines: OrderLineCTO[] = [
        {
          orderLine: {
            id: 1,
            modificationCounter: 1,
            dishId: 1,
            amount: 2,
            comment: 'please not too spicy',
            orderId: 1,
          },
        },
        { orderLine: { id: 2, modificationCounter: 1, dishId: 5, amount: 1, orderId: 1 } },
      ];
      return expect(uc.createOrder(orderLines, 'GB_123')).resolves.toStrictEqual(fakeOrder);
    });
    it('should create an booking order', () => {
      const orderLines: OrderLineCTO[] = [
        {
          orderLine: {
            id: 1,
            modificationCounter: 1,
            dishId: 1,
            amount: 2,
            comment: 'please not too spicy',
            orderId: 1,
          },
        },
        { orderLine: { id: 2, modificationCounter: 1, dishId: 5, amount: 1, orderId: 1 } },
      ];
      return expect(uc.createOrder(orderLines, 'GB_123')).resolves.toStrictEqual(fakeOrder);
    });
  });
});
