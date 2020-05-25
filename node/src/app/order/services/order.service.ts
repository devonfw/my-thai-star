import { Injectable } from '@nestjs/common';
import { Pageable } from '../../shared/model/dto/pageable.dto';
import { OrderLineCTO } from '../model/dto/order-lineCTO.dto';
import { Order } from '../model/entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderUseCase } from './use-cases/create-order.use-case';
import { DeleteOrderUseCase } from './use-cases/delete-order.use-case';
import { WinstonLogger } from '../../shared/logger/winston.logger';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly createOrderUc: CreateOrderUseCase,
    private readonly deleteOrderUc: DeleteOrderUseCase,
    private readonly logger: WinstonLogger,
  ) {}

  /**
   * Creates a new order for a booking. The order will contain the
   * provided order lines.
   *
   * @param orderLine the order lines
   * @param bookingToken the booking token
   */
  createOrder(orderLine: OrderLineCTO[], bookingToken: string): Promise<Order> {
    this.logger.debug(
      `Executing createOrder. Params: orderLine=${orderLine}, bookingToken=${bookingToken}`,
      'OrderService',
    );
    return this.createOrderUc.createOrder(orderLine, bookingToken);
  }

  /**
   * Deletes an order with its order lines and order line extra ingredients.
   * @param orderId the order id
   */
  deleteOrder(orderId: number): Promise<void> {
    this.logger.debug(`Executing deleteOrder. Params: orderId=${orderId}`, 'OrderService');
    return this.deleteOrderUc.deleteOrder(orderId);
  }

  /**
   * Search orders by criteria
   *
   * @param pageable the pagination parameter
   * @param email the email to search
   * @param token the token to search
   */
  searchOrder(pageable: Pageable, email?: string, token?: string): Promise<[Order[], number]> {
    this.logger.debug(
      `Executing searchOrder. Params: pageable=${pageable}, email=${email}, token=${token}`,
      'OrderService',
    );
    return this.orderRepository.searchOrderByCriteria({ pageable, email, token });
  }
}
