import { EntityRepository, Repository } from 'typeorm';
import { BookingSearch } from '../model/dto/booking-search.dto';
import { Booking } from '../model/entities/booking.entity';
import { InvitedGuest } from '../model/entities/invited-guest.entity';

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
  async searchBookingByCriteria(search: BookingSearch): Promise<[Booking[], number]> {
    let queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('Booking.invitedGuests', 'invitedGuests')
      .leftJoinAndSelect('Booking.table', 'table')
      .leftJoinAndSelect('Booking.order', 'order')
      .leftJoinAndSelect('Booking.user', 'user')
      .leftJoinAndSelect('order.orderLines', 'orderLines')
      .where('Booking.bookingDate >= :now', { now: new Date() });

    if (search.bookingToken) {
      queryBuilder = queryBuilder.andWhere('Booking.bookingToken = :token', {
        token: search.bookingToken,
      });
    }

    if (search.email) {
      queryBuilder = queryBuilder.andWhere('LOWER(Booking.email) LIKE :email', {
        email: '%' + search.email.toLowerCase() + '%',
      });
    }

    if (search.pageable) {
      if (search.pageable.sort) {
        search.pageable.sort.forEach(elem => {
          queryBuilder = queryBuilder.addOrderBy('Booking.' + elem.property, elem.direction);
        });
      }

      queryBuilder = queryBuilder
        .take(search.pageable.pageSize)
        .skip(search.pageable.pageSize * search.pageable.pageNumber);
    }

    return queryBuilder.getManyAndCount();
  }

  async deleteCascadeBooking(booking: Booking): Promise<void> {
    await this.manager.transaction(async manager => {
      await manager.getCustomRepository(BookingRepository).deleteCascadeOrderByBookingId(booking.id);

      if (booking.invitedGuests?.length) {
        await manager.delete(
          InvitedGuest,
          booking.invitedGuests.map(guest => guest.id),
        );
        booking.invitedGuests = undefined;
      }

      await manager.delete(Booking, booking.id);
    });
  }

  private async deleteCascadeOrderByBookingId(bookingId: number): Promise<void> {
    const orderIds = this.manager
      .createQueryBuilder()
      .from('Orders', 'orders')
      .select('id')
      .where('Orders.idBooking = :id');
    const orderLineId = this.manager
      .createQueryBuilder()
      .from('OrderLine', 'orderLine')
      .select('id')
      .where('OrderLine.idOrder IN (' + orderIds.getQuery() + ')');

    await this.manager
      .createQueryBuilder()
      .from('OrderDishExtraIngredient', 'orderDish')
      .delete()
      .where('idOrderLine IN (' + orderLineId.getQuery() + ')')
      .setParameter('id', bookingId)
      .execute();
    await orderLineId.delete().from('OrderLine', 'orderLine').setParameter('id', bookingId).execute();
    await this.manager
      .createQueryBuilder()
      .delete()
      .from('Orders', 'orders')
      .where('Orders.idBooking = :id')
      .setParameter('id', bookingId)
      .execute();
  }
}
