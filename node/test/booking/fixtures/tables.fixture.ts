import { Table } from '../../../src/app/booking/model/entities/table.entity';

export const tablesFixture: Array<Omit<Table, 'modificationCounter'>> = [
  {
    id: 1,
    seatsNumber: 4,
  },
  {
    id: 2,
    seatsNumber: 4,
  },
  {
    id: 3,
    seatsNumber: 6,
  },
  {
    id: 4,
    seatsNumber: 8,
  },
];
