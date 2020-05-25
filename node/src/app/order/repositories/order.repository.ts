import { Brackets, EntityRepository, Repository } from 'typeorm';
import { Pageable } from '../../shared/model/dto/pageable.dto';
import { Order } from '../model/entities/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async searchOrderByCriteria(search: {
    pageable: Pageable;
    token?: string;
    email?: string;
  }): Promise<[Order[], number]> {
    let queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('Order.booking', 'booking')
      .leftJoinAndSelect('Order.orderLines', 'orderLines')
      .leftJoinAndSelect('orderLines.dish', 'dish')
      .leftJoinAndSelect('orderLines.ingredients', 'ingredients')
      .leftJoinAndSelect('booking.table', 'table')
      .leftJoinAndSelect('booking.invitedGuests', 'invitedGuests')
      .leftJoinAndSelect('booking.user', 'user')
      .where('booking.bookingDate >= :now', { now: new Date() });

    if (search.token) {
      if (search.token.startsWith('GB')) {
        queryBuilder = queryBuilder.andWhere('invitedGuests.guestToken = :token', {
          token: search.token,
        });
      } else {
        queryBuilder = queryBuilder.andWhere('booking.bookingToken = :token', {
          token: search.token,
        });
      }
    }

    if (search.email) {
      queryBuilder = queryBuilder.andWhere(
        new Brackets(cb => {
          cb.where('LOWER(booking.email) LIKE :email', {
            email: '%' + search.email!.toLowerCase() + '%',
          }).orWhere('LOWER(invitedGuests.email) LIKE :email', {
            email: '%' + search.email!.toLowerCase() + '%',
          });
        }),
      );
    }

    if (search.pageable) {
      if (search.pageable.sort) {
        search.pageable.sort.forEach(elem => {
          queryBuilder = queryBuilder.addOrderBy(elem.property, elem.direction);
        });
      }

      console.log('paginando');
      queryBuilder = queryBuilder
        .take(search.pageable.pageSize)
        .skip(search.pageable.pageSize * search.pageable.pageNumber);
    }

    return queryBuilder.getManyAndCount();
  }

  async deleteCascadeOrder(orderId: number): Promise<void> {
    return this.manager.transaction(async eManager => {
      const orderLineId = eManager
        .createQueryBuilder()
        .from('OrderLine', 'OrderLine')
        .select('id')
        .where('OrderLine.idOrder = :id');

      await eManager
        .createQueryBuilder()
        .from('OrderDishExtraIngredient', 'orderDish')
        .where('idOrderLine IN (' + orderLineId.getQuery() + ')')
        .setParameter('id', orderId)
        .delete()
        .execute();
      await orderLineId.setParameter('id', orderId).delete().execute();
      await eManager.delete(Order, orderId);
    });
  }
}
