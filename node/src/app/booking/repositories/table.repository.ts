import { Table } from '../model/entities/table.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Table)
export class TableRepository extends Repository<Table> {
  getFreeTable(dateFrom: Date, dateTo: Date, assistants: number): Promise<Table[]> {
    return this.createQueryBuilder()
      .leftJoin('Booking', 'booking', 'Table.id = booking.idTable')
      .where('seatsNumber >= :assistants', { assistants })
      .andWhere(
        '(booking.bookingDate IS NULL OR booking.bookingDate NOT BETWEEN CAST(:date1 AS DATE) AND CAST(:date2 AS DATE))',
        {
          date1: dateFrom,
          date2: dateTo,
        },
      )
      .orderBy('seatsNumber', 'ASC')
      .getMany();
  }
}
