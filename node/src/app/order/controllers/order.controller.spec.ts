process.env.NODE_ENV = 'test';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { bookingsSample } from '../../../migration/__fixture__/booking/bookings.fixture';
import { invitedGuestsSample } from '../../../migration/__fixture__/booking/invites-guests.fixture';
import { CoreModule } from '../../core/core.module';
import { InvalidTokenException } from '../../shared/exceptions/invalid-token.exception';
import { GuestNotAccpetedException } from '../exceptions/guest-not-accepted.exception';
import { OrderAlreadyDoneException } from '../exceptions/order-already-done.exception';
import { WrongIdException } from '../exceptions/wrong-id.exception';
import { NewOrder } from '../model/dto/new-order.dto';
import { OrderLine } from '../model/entities/order-line.entity';
import { OrderModule } from '../order.module';
import { OrderRepository } from '../repositories/order.repository';
import { OrderController } from './order.controller';

const newOrder = {
  orderLines: [
    { orderLine: { dishId: 3, amount: 1, comment: 'not too spicy' }, extras: [{ id: 1 }, { id: 2 }] },
    { orderLine: { dishId: 1, amount: 1, comment: '' }, extras: [] },
  ],
};

describe('OrderController', () => {
  let controller: OrderController;
  let orderRepo: OrderRepository;
  let orderLineRepo: Repository<OrderLine>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, OrderModule],
    }).compile();
    await module.init();
    controller = module.get<OrderController>(OrderController);
    orderRepo = module.get<OrderRepository>(OrderRepository);
    orderLineRepo = module.get<Repository<OrderLine>>('OrderLineRepository');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(orderRepo).toBeDefined();
    expect(orderLineRepo).toBeDefined();
  });

  describe('createOrder', () => {
    it('should throw an error if booking token do not starts with CB_ or GB_', () => {
      return expect(controller.createOrder({ orderLines: [], booking: { bookingToken: '123' } })).rejects.toThrowError(
        InvalidTokenException,
      );
    });

    it('should throw an error if booking token is invalid', () => {
      return expect(
        controller.createOrder({ orderLines: [], booking: { bookingToken: 'CB_123' } }),
      ).rejects.toThrowError(InvalidTokenException);
    });

    it('should throw an error if the booker already did an order', () => {
      return expect(
        controller.createOrder({ orderLines: [], booking: { bookingToken: bookingsSample[0].bookingToken! } }),
      ).rejects.toThrowError(OrderAlreadyDoneException);
    });

    it('should throw an error if guest token is invalid', () => {
      return expect(
        controller.createOrder({ orderLines: [], booking: { bookingToken: 'GB_123' } }),
      ).rejects.toThrowError(InvalidTokenException);
    });

    it('should throw an error if invitation is not accepted', () => {
      return expect(
        controller.createOrder({ orderLines: [], booking: { bookingToken: invitedGuestsSample[2].guestToken! } }),
      ).rejects.toThrowError(GuestNotAccpetedException);
    });

    it('should throw an error if the guest already did an order', () => {
      return expect(
        controller.createOrder({ orderLines: [], booking: { bookingToken: invitedGuestsSample[0].guestToken! } }),
      ).rejects.toThrowError(OrderAlreadyDoneException);
    });

    it('should create a order for a booking', async () => {
      const order = await controller.createOrder({
        ...newOrder,
        booking: { bookingToken: bookingsSample[3].bookingToken! },
      } as NewOrder);
      expect(order.bookingId).toStrictEqual(bookingsSample[3].id);
      expect(order.invitedGuestId).toStrictEqual(null);
      expect(order.orderLines?.length).toStrictEqual(newOrder.orderLines.length);
      expect(order.orderLines![0]).toEqual({
        ...newOrder.orderLines[0].orderLine,
        id: expect.anything(),
        modificationCounter: expect.anything(),
        dish: expect.anything(),
        ingredients: expect.anything(),
        orderId: order.id,
      });
      expect(order.orderLines![0].ingredients?.length).toStrictEqual(newOrder.orderLines![0].extras.length);
      expect(order.orderLines![0].ingredients![0].id).toStrictEqual(newOrder.orderLines[0].extras[0].id);
      expect(order.orderLines![0].ingredients![1].id).toStrictEqual(newOrder.orderLines[0].extras[1].id);
      expect(order.orderLines![1]).toEqual({
        ...newOrder.orderLines[1].orderLine,
        id: expect.anything(),
        modificationCounter: expect.anything(),
        dish: expect.anything(),
        ingredients: expect.anything(),
        orderId: order.id,
      });
      expect(order.orderLines![1].ingredients?.length).toStrictEqual(newOrder.orderLines![1].extras.length);
    });

    it('should create a order for a guest', async () => {
      const order = await controller.createOrder({
        ...newOrder,
        booking: { bookingToken: invitedGuestsSample[7].guestToken! },
      } as NewOrder);
      expect(order.bookingId).toStrictEqual(invitedGuestsSample[7].bookingId);
      expect(order.invitedGuestId).toStrictEqual(invitedGuestsSample[7].id);
      expect(order.orderLines?.length).toStrictEqual(newOrder.orderLines.length);
      expect(order.orderLines![0]).toEqual({
        ...newOrder.orderLines[0].orderLine,
        id: expect.anything(),
        modificationCounter: expect.anything(),
        dish: expect.anything(),
        ingredients: expect.anything(),
        orderId: order.id,
      });
      expect(order.orderLines![0].ingredients?.length).toStrictEqual(newOrder.orderLines![0].extras.length);
      expect(order.orderLines![0].ingredients![0].id).toStrictEqual(newOrder.orderLines[0].extras[0].id);
      expect(order.orderLines![0].ingredients![1].id).toStrictEqual(newOrder.orderLines[0].extras[1].id);
      expect(order.orderLines![1]).toEqual({
        ...newOrder.orderLines[1].orderLine,
        id: expect.anything(),
        modificationCounter: expect.anything(),
        dish: expect.anything(),
        ingredients: expect.anything(),
        orderId: order.id,
      });
      expect(order.orderLines![1].ingredients?.length).toStrictEqual(newOrder.orderLines![1].extras.length);
    });
  });

  describe('searchOrder', () => {
    it('should paginate the response', async () => {
      const response = await controller.searchOrder({ pageable: { pageSize: 2, pageNumber: 1 } });
      expect(response.totalElements).toStrictEqual(10);
      expect(response.content.length).toStrictEqual(2);
      expect(response.content[0].order?.id).toStrictEqual(3);
      expect(response.content[1].order?.id).toStrictEqual(4);
      expect(response.pageable).toEqual({ pageSize: 2, pageNumber: 1 });
    });

    it('should sort the response', async () => {
      const response = await controller.searchOrder({
        pageable: { pageSize: 8, pageNumber: 0, sort: [{ property: 'booking.email', direction: 'DESC' }] },
      });
      expect(response.totalElements).toStrictEqual(10);
      expect(response.content.length).toStrictEqual(8);
      expect(
        response.content.reduce((prev, curr, idx) => {
          if (idx === 0) return prev;
          return prev && curr.booking.email <= response.content[idx - 1].booking.email;
        }, true),
      ).toStrictEqual(true);
      expect(response.pageable).toEqual({
        pageSize: 8,
        pageNumber: 0,
        sort: [{ property: 'booking.email', direction: 'DESC' }],
      });
    });

    it('should filter by bookingToken', async () => {
      const response = await controller.searchOrder({
        pageable: { pageSize: 8, pageNumber: 0 },
        bookingToken: bookingsSample[0].bookingToken,
      });
      expect(response.totalElements).toStrictEqual(1);
      expect(response.content.length).toStrictEqual(1);
      expect(response.content[0].order?.id).toStrictEqual(1);
      expect(response.pageable).toEqual({ pageSize: 8, pageNumber: 0 });
    });

    it('should filter by email', async () => {
      const response = await controller.searchOrder({
        pageable: { pageSize: 8, pageNumber: 0 },
        email: bookingsSample[0].email,
      });
      expect(response.totalElements).toStrictEqual(1);
      expect(response.content.length).toStrictEqual(1);
      expect(response.content[0].order?.id).toStrictEqual(1);
      expect(response.pageable).toEqual({ pageSize: 8, pageNumber: 0 });
    });
  });

  describe('cancelOrder', () => {
    it('should return an error if an invalid order id is passed', () => {
      return expect(controller.cancelOrder(123)).rejects.toThrowError(WrongIdException);
    });

    it('should completely delete the order', async () => {
      await controller.cancelOrder(9);
      expect(await orderLineRepo.findByIds([13, 14])).toStrictEqual([]);
      expect(await orderRepo.findByIds([9])).toStrictEqual([]);
    });
  });
});
