import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { TableRepository } from '../../repositories/table.repository';

/**
 * US: calculate best table
 *
 * As a guest I would like the system to check (1 hour before my invite) all my invites and to reserve a table fitting the number of accepted users
 * Details
 * Pseudo-algorithm for reservation: Find table for given date and time where seats of guests >= Count of invited guests plus one. In case no results, decline request and show error message to user. In case of any result, make a reservation for table…​. For each decline of a guest remove guest and search with reduced number for new table. In case table is found, reserve it and remove reservation from previous table. In case not, do not change reservations.
 *
 * @export
 * @class GetTableUseCase
 */
@Injectable()
export class GetTableUseCase {
  constructor(private readonly tableRepository: TableRepository) {}

  async getFreeTable(bookingDate: Date, assistants: number): Promise<number | undefined> {
    const date = moment(bookingDate);

    const tables = await this.tableRepository.getFreeTable(date.add(-1, 'hour').toDate(), bookingDate, assistants);

    return tables.length > 0 ? tables[0].id : undefined;
  }
}
