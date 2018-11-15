import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'shared/base.service';
import { Order } from './models/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  OrderListInfo,
  CustomOrderFilter,
  OrderResult,
  OrderView,
} from 'shared/interfaces';
import { OrderLine } from './models/orderLine.entity';
import { Ingredient } from 'model/ingredient/ingredient.entity';
import { Dish } from 'management/dish/models/dish.entity';
import { BookingService } from 'management/booking/booking.service';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly _orderRepository: Repository<Order>,
    @Inject(BookingService) private readonly _bookingService: BookingService,
    @InjectRepository(Ingredient)
    private readonly _ingredientRepository: Repository<Ingredient>,
    @InjectRepository(OrderLine)
    private readonly _orderLineRepository: Repository<OrderLine>,
    @InjectRepository(Dish) private readonly _dishRepository: Repository<Dish>,
  ) {
    super();
    this._repository = _orderRepository;
  }

  async createOrder(input: OrderListInfo): Promise<Order> {
    try {
      const exists = await this._bookingService.findOne({
        bookingToken: input.booking.bookingToken,
      });
      if (!exists) {
        throw new HttpException(
          'The provided booking token does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      let entity = this._repository.create();
      entity.host = exists;
      entity.booking = exists;
      entity = await this._repository.save(entity);
      exists.order = entity;
      await this._bookingService.update(exists.id, exists);
      if (input.orderLines.length !== 0) {
        const orderLines = Array<OrderLine>();
        for (const element of input.orderLines) {
          const orderLine = this._orderLineRepository.create(element.orderLine);
          orderLine.order = entity;
          if (element.extras.length !== 0) {
            const extras = Array<Ingredient>();
            for (const extraId of element.extras) {
              const extra = await this._ingredientRepository.findOne(extraId);
              if (extra) extras.push(extra);
            }
            orderLine.extras = extras;
          }
          const dish = await this._dishRepository.findOne({
            id: element.orderLine.dishId,
          });
          if (dish) {
            orderLine.dish = dish;
            orderLines.push(await this._orderLineRepository.save(orderLine));
          }
        }
        entity.orderLines = orderLines;
      }
      await this._repository.update(entity.id, entity);
      return await this._repository.findOne(entity.id);
    } catch (error) {
      throw error;
    }
  }

  async getOrders(filter: CustomOrderFilter): Promise<OrderResult> {
    try {
      const response: OrderResult = {
        pagination: {
          page: filter.pagination.page,
          size: filter.pagination.size,
          total: 0,
        },
        result: [],
      };
      const offset = (filter.pagination.page - 1) * filter.pagination.size;
      const total = await this._repository.count();
      // Math.ceil(total / filter.pagination.size); if it must return total pages instead of total elements left
      response.pagination.total = total - offset;
      const query = await this.createQuery(filter, offset);
      const orders = await query.getMany();
      for (const element of orders) {
        const orderLine: {
          dish: any;
          extras: any;
          order: any;
          orderLine: any;
        }[] = [];
        for (const orderlineElement of element.orderLines) {
          orderLine.push({
            dish: orderlineElement.dish,
            extras: orderlineElement.extras,
            order: orderlineElement.order,
            orderLine: orderlineElement,
          });
        }
        const resultElement: OrderView = {
          booking: await this._bookingService.toDTO(element.booking),
          host: await this._bookingService.toDTO(element.host),
          invitedGuest: element.invitedGuest || null,
          order: element,
          orderLines: orderLine,
        };
        response.result.push(resultElement);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createQuery(
    filter: CustomOrderFilter,
    offset: number,
  ): Promise<SelectQueryBuilder<Order>> {
    try {
      let query = await this._repository.createQueryBuilder('order');
      query
        .leftJoinAndSelect('order.booking', 'booking')
        .leftJoinAndSelect('booking.table', 'table')
        .leftJoinAndSelect('booking.invitedGuests', 'invGuests');
      query.leftJoinAndSelect('order.invitedGuest', 'invitedGuest');
      query
        .leftJoinAndSelect('order.orderLines', 'oLine')
        .leftJoinAndSelect('oLine.dish', 'dish')
        .leftJoinAndSelect('oLine.extras', 'extras');
      query.leftJoinAndSelect('order.host', 'host');
      if (filter.email || filter.bookingToken)
        query = await this.addFilter(query, filter);
      if (filter.sort.length !== 0) {
        if (filter.sort[0].direction === 'ASC') {
          query.addOrderBy(`booking.${filter.sort[0].name}`, 'ASC');
        } else {
          query.addOrderBy(`booking.${filter.sort[0].name}`, 'DESC');
        }
      }
      query.skip(offset);
      query.take(filter.pagination.size);
      return query;
    } catch (e) {
      throw e;
    }
  }

  async addFilter(
    query: SelectQueryBuilder<Order>,
    filter: CustomOrderFilter,
  ): Promise<SelectQueryBuilder<Order>> {
    if (filter.email && filter.bookingToken) {
      return query.where(
        `booking.email like '%${
          filter.email
        }%' and booking.bookingToken like '%${filter.bookingToken}%'`,
      );
    } else {
      if (filter.email)
        return query.where(`booking.email like '%${filter.email}%'`);
      return query.where(
        `booking.bookingToken like '%${filter.bookingToken}%'`,
      );
    }
  }
}
